import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Table', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-table size='equal'>
        <b2b-table-rowgroup type='header'>
          <b2b-table-row>
            <b2b-table-header sort-direction="not-sorted">Title 1</b2b-table-header>
            <b2b-table-header>Title 2</b2b-table-header>
            <b2b-table-header sort-direction="descending" sort-id='title3'>Title 3</b2b-table-header>
          </b2b-table-row>
        </b2b-table-rowgroup>
        <b2b-table-rowgroup type='body'>
          <b2b-table-row>
            <b2b-table-cell><p>data 1a</p></b2b-table-cell>
            <b2b-table-cell>data 2a</b2b-table-cell>
            <b2b-table-cell>data 3a</b2b-table-cell>
          </b2b-table-row>
        </b2b-table-rowgroup>
      </b2b-table>
    `);
  });

  it('should render the table component', async () => {
    const element = await page.find('b2b-table');
    expect(element).not.toBeNull;
  });

  it('should set cell sizes according to table size', async () => {
    const cells = await page.findAll('b2b-table-cell');
    cells.map(cell => {
      expect(cell.getAttribute('size')).toBe('equal');
    });
  });

  it('should set headers to fixed only if table is scrollable', async () => {
    const cells = await page.findAll('b2b-table-header');
    cells.map(cell => {
      expect(cell.getAttribute('fixed')).not.toBe('true');
    });
  });

  it('should set headers to fixed if table is scrollable', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-scrollable-container>
        <b2b-table size='equal'>
          <b2b-table-rowgroup type='header'>
            <b2b-table-row>
              <b2b-table-header>Title 1</b2b-table-header>
              <b2b-table-header>Title 2</b2b-table-header>
            </b2b-table-row>
        </b2b-table>
      </b2b-scrollable-container>
    `);
    const cells = await page.findAll('b2b-table-header');
    cells.map(cell => {
      expect(cell.getAttribute('fixed')).toBe('true');
    });
  });

  it('should set header rows not highlightable', async () => {
    const headerRow = await page.find(
      'b2b-table-rowgroup[type=header] b2b-table-row',
    );
    const isHeaderRowSelectable = await headerRow.getProperty('highlight');
    expect(isHeaderRowSelectable).toBe(false);

    const dataRow = await page.find(
      'b2b-table-rowgroup[type=body] b2b-table-row',
    );
    const isDataRowSelectable = await dataRow.getProperty('highlight');
    expect(isDataRowSelectable).toBe(true);
  });

  it('should show a descending sorting button when a column header is hovered or focused', async () => {
    const headerCol = await page.find({ text: 'Title 1' });
    const sortArrow = await headerCol.find('svg');
    const ariaState = await headerCol.getAttribute('aria-sort');
    expect(sortArrow).toBeNull;
    expect(ariaState).toEqualText('other');

    await headerCol.hover();

    expect(sortArrow).not.toBeNull;
  });

  it('should emit the sort direction when a column header is clicked', async () => {
    const headerCol = await page.find({ text: 'Title 1' });
    const b2bChange = await page.spyOnEvent('b2b-change');

    await headerCol.click();

    const ariaState = await headerCol.getAttribute('aria-sort');

    expect(ariaState).toEqualText('ascending');
    expect(b2bChange).toHaveReceivedEvent();
  });

  it('should emit the sort direction when a column header is focused and enter is pressed', async () => {
    const headerCol = await page.find({ text: 'Title 1' });
    const b2bChange = await page.spyOnEvent('b2b-change');
    let ariaState = await headerCol.getAttribute('aria-sort');
    expect(ariaState).toEqualText('other');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForChanges();

    ariaState = await headerCol.getAttribute('aria-sort');
    expect(ariaState).toEqualText('ascending');
    expect(b2bChange).toHaveReceivedEvent();
  });

  it('should un-sort siblings when sorting any column', async () => {
    const headerCol = await page.find({ text: 'Title 3' });
    let ariaState = await headerCol.getAttribute('aria-sort');
    expect(ariaState).toEqualText('descending');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForChanges();

    ariaState = await headerCol.getAttribute('aria-sort');
    expect(ariaState).toEqualText('other');
  });

  it('should not change sorting of siblings if they do not implement sorting', async () => {
    const headerCol = await page.find({ text: 'Title 2' });
    let ariaState = await headerCol.getAttribute('aria-sort');
    expect(ariaState).toEqualText('other');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForChanges();

    ariaState = await headerCol.getAttribute('aria-sort');
    expect(ariaState).toEqualText('other');

    const sortDirection = await headerCol.getAttribute('sort-direction');
    expect(sortDirection).toBeNull();
  });

  it('Table should emit an event with the sorting column and direction', async () => {
    const headerCol = await page.find({ text: 'Title 1' });
    const b2bChange = await page.spyOnEvent('b2b-sort-change');

    await headerCol.click();

    expect(b2bChange).toHaveReceivedEvent();
    expect(b2bChange).toHaveReceivedEventDetail({
      sortedColumn: 'Title 1',
      sortDirection: 'ascending',
    });
  });

  it('Table sort-change event should emit header sort-id if provided', async () => {
    const headerCol = await page.find({ text: 'Title 3' });
    const b2bChange = await page.spyOnEvent('b2b-sort-change');

    await headerCol.click();

    expect(b2bChange).toHaveReceivedEvent();
    expect(b2bChange).toHaveReceivedEventDetail({
      sortedColumn: 'title3',
      sortDirection: 'ascending',
    });
  });
});
