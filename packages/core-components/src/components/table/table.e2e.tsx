import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Table', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage({ timeout: 10000 });
    await page.setContent(`
      <b2b-table size='equal'>
        <b2b-table-rowgroup type='header'>
          <b2b-table-row>
            <b2b-table-header sort-direction="not-sorted" sort-icon-align="left">Title 1</b2b-table-header>
            <b2b-table-header>Title 2</b2b-table-header>
            <b2b-table-header sort-direction="descending" sort-id='title3' sort-icon-align="right">Title 3</b2b-table-header>
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

  const tableWithAccordion = `
    <b2b-table size="expand">
      <b2b-table-rowgroup type="header" accordion>
        <b2b-table-row id="test-header">
          <b2b-table-header>Title 1</b2b-table-header>
          <b2b-table-header>Title 2</b2b-table-header>
        </b2b-table-row>
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion>
        <b2b-table-row id="test-parent">
          <b2b-table-cell><p>data 1a</p></b2b-table-cell>
          <b2b-table-cell>data 2a</b2b-table-cell>
        </b2b-table-row>
        <b2b-table-row id="test-child">
          <b2b-table-cell><p>data 1a</p></b2b-table-cell>
          <b2b-table-cell>data 2a</b2b-table-cell>
        </b2b-table-row>
      </b2b-table-rowgroup>
    </b2b-table>`;

  const tableWithSelection = `
    <b2b-table size="expand">
      <b2b-table-rowgroup type="header" accordion selectable>
        <b2b-table-row id="test-header">
          <b2b-table-header>Title 1</b2b-table-header>
          <b2b-table-header>Title 2</b2b-table-header>
        </b2b-table-row>
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion selectable opened>
        <b2b-table-row id="test-parent" value="peaches">
          <b2b-table-cell><p>data 1a</p></b2b-table-cell>
          <b2b-table-cell>data 2a</b2b-table-cell>
        </b2b-table-row>
        <b2b-table-row id="test-child" value="cherries">
          <b2b-table-cell><p>data 1a</p></b2b-table-cell>
          <b2b-table-cell>data 2a</b2b-table-cell>
        </b2b-table-row>
        <b2b-table-row id="second-child" value="plums">
        <b2b-table-cell><p>data 1a</p></b2b-table-cell>
        <b2b-table-cell>data 2a</b2b-table-cell>
      </b2b-table-row>
      </b2b-table-rowgroup>
    </b2b-table>`;

  const tableWithColspan = `
  <b2b-table size='colspan'>
    <b2b-table-rowgroup type='header'>
      <b2b-table-row>
        <b2b-table-header colspan="2">Title 1 + 2</b2b-table-header>
        <b2b-table-header>Title 2</b2b-table-header>
      </b2b-table-row>
    </b2b-table-rowgroup>
    <b2b-table-rowgroup type='body'>
      <b2b-table-row>
        <b2b-table-cell><p>data 1a</p></b2b-table-cell>
        <b2b-table-cell colspan="2">data 2a + 3a</b2b-table-cell>
      </b2b-table-row>
    </b2b-table-rowgroup>
  </b2b-table>
`;

  it('should render the table component', async () => {
    const element = await page.find('b2b-table');
    expect(element).not.toBeNull();
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
    const rowGroup = await page.find('b2b-table-rowgroup');

    expect(await rowGroup.getProperty('fixed')).toBe(true);
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
    const sortArrow = await page.find('b2b-table-header >>> svg');
    const ariaState = await headerCol.getAttribute('aria-sort');
    expect(await sortArrow.isVisible()).toBe(false);
    expect(ariaState).toEqualText('other');

    await headerCol.hover();

    await page.waitForChanges();

    expect(await sortArrow.isVisible()).toBe(true);
  });

  it('should emit the sort direction when a column header is clicked', async () => {
    const headerCol = await page.find({ text: 'Title 1' });
    const b2bChange = await page.spyOnEvent('b2b-change');
    const sortArrow = await page.find('b2b-table-header >>> svg');

    let ariaState = await headerCol.getAttribute('aria-sort');

    expect(sortArrow).toHaveClass('b2b-table-header__sort--right');

    expect(ariaState).toEqualText('other');

    await headerCol.click();
    ariaState = await headerCol.getAttribute('aria-sort');

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

  it('should render the first row of a rowgroup as an accordion parent if accordion is true on a rowgroup and the rowgroup type is body', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithAccordion);
    const firstRow = await page.find('#test-parent');
    const arrowCell = await firstRow.find('b2b-table-row__accordion-icon');

    expect(arrowCell).toBeDefined();
  });

  it('should render all rows as accordion children when they are in the same rowgroup of type body in which accordion is true', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithAccordion);
    const childRow = await page.find('#test-child');
    const controlCell = await childRow.find(
      '.b2b-table-row__control-cell--accordion',
    );

    expect(controlCell).toBeDefined();
  });

  it('should add an extra column for controls if accordion is true on a rowgroup', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithAccordion);
    const header = await page.find('#test-header >>> b2b-table-header');

    expect(header).toEqualText('');

    const parent = await page.find('#test-parent >>> b2b-table-cell');
    const parentControl = await parent.find('button');
    expect(parentControl).toBeDefined;
  });

  it('should show children accordion rows if the arrow is clicked in a parent accordion row', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithAccordion);

    const parent = await page.find('#test-parent >>> b2b-table-cell');
    const parentControl = await parent.find('button');

    const child = await page.find('#test-child');
    const styleBefore = await child.getComputedStyle();

    expect(styleBefore['visibility']).toEqual('collapse');

    await parentControl.click();
    await page.waitForChanges();

    const styleAfter = await child.getComputedStyle();

    expect(styleAfter['visibility']).toEqual('visible');
  });

  it('should show children accordion rows if the arrow is focused and enter is pressed in a parent accordion row', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithAccordion);

    const child = await page.find('#test-child');
    const styleBefore = await child.getComputedStyle();

    expect(styleBefore['visibility']).toEqual('collapse');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    const styleAfter = await child.getComputedStyle();

    expect(styleAfter['visibility']).toEqual('visible');
  });

  it('should hide children accordion rows if the arrow is pressed again', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithAccordion);

    const parent = await page.find('#test-parent >>> b2b-table-cell');
    const parentControl = await parent.find('button');

    const child = await page.find('#test-child');
    const styleBefore = await child.getComputedStyle();

    expect(styleBefore['visibility']).toEqual('collapse');

    await parentControl.click();
    await page.waitForChanges();
    await parentControl.click();
    await page.waitForChanges();

    const styleAfter = await child.getComputedStyle();

    expect(styleAfter['visibility']).toEqual('collapse');
  });

  it('should render accordion opened if prop set to true', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-table size="expand">
      <b2b-table-rowgroup type="header" accordion>
        <b2b-table-row id="test-header">
          <b2b-table-header>Title 1</b2b-table-header>
          <b2b-table-header>Title 2</b2b-table-header>
        </b2b-table-row>
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion opened>
        <b2b-table-row id="test-parent">
          <b2b-table-cell><p>data 1a</p></b2b-table-cell>
          <b2b-table-cell>data 2a</b2b-table-cell>
        </b2b-table-row>
        <b2b-table-row id="test-child">
          <b2b-table-cell><p>data 1a</p></b2b-table-cell>
          <b2b-table-cell>data 2a</b2b-table-cell>
        </b2b-table-row>
      </b2b-table-rowgroup>
    </b2b-table>`);
    const child = await page.find('#test-child');

    const toggleIconClass = await page.evaluate(() => {
      const parentRow = document.querySelector('#test-parent');
      const toggleIcon = parentRow.shadowRoot.querySelector(
        'b2b-table-cell button',
      );
      return toggleIcon.className;
    });

    expect(toggleIconClass).toContain('b2b-table-row__accordion-icon--open');

    const childInitialStyle = await child.getComputedStyle();
    expect(childInitialStyle['visibility']).toEqual('visible');
  });

  it('should render a checkbox column when selectable is set to true on a rowgroup', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);

    const headerCheckbox = await page.find('#test-header >>> b2b-checkbox');
    expect(headerCheckbox).not.toBeNull();

    const rowCheckbox = await page.find('#test-parent >>> b2b-checkbox');
    expect(rowCheckbox).not.toBeNull();
  });

  it('should toggle all rows when the header row is clicked', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);

    const headerCheckbox = await page.find('#test-header >>> b2b-checkbox');
    await headerCheckbox.click();

    const firstRow = await page.find('#test-parent');
    const secondRow = await page.find('#test-child');
    const thirdRow = await page.find('#second-child');

    expect(await firstRow.getProperty('checked')).toBe(true);
    expect(await secondRow.getProperty('checked')).toBe(true);
    expect(await thirdRow.getProperty('checked')).toBe(true);

    await headerCheckbox.click();

    expect(await firstRow.getProperty('checked')).toBe(false);
    expect(await secondRow.getProperty('checked')).toBe(false);
    expect(await thirdRow.getProperty('checked')).toBe(false);
  });

  it('should toggle all children rows of a parent accordion row if the parent is selected', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);

    const firstRow = await page.find('#test-parent >>> b2b-checkbox');
    expect(firstRow).not.toBeNull();
    await firstRow.click();

    const secondRow = await page.find('#test-child');

    expect(await secondRow.getProperty('checked')).toBe(true);

    await firstRow.click();

    expect(await secondRow.getProperty('checked')).toBe(false);
  });

  it('should display an indeterminate checkbox if some rows are checked', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);

    const checkbox = await page.find('#test-child >>> b2b-checkbox');
    expect(checkbox).not.toBeNull();
    await checkbox.click();

    const secondRow = await page.find('#test-child');

    expect(await secondRow.getProperty('checked')).toBe(true);

    const header = await page.find('#test-header');
    expect(await header.getProperty('indeterminate')).toBe(true);
  });

  it('should display an indeterminate checkbox in the parent row of an accordion if not all children are checked', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);

    const secondRow = await page.find('#test-child >>> b2b-checkbox');
    await secondRow.click();

    expect(await secondRow.getProperty('checked')).toBe(true);

    const firstRow = await page.find('#test-parent >>> b2b-checkbox');
    expect(await firstRow.getProperty('indeterminate')).toBe(true);
  });

  it('should emit the currently selected values when a row is selected or unselected', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);
    const selectSpy = await page.spyOnEvent('b2b-row-selected');

    const secondRow = await page.find('#test-child >>> b2b-checkbox');
    await secondRow.click();

    await page.waitForChanges();

    expect(selectSpy).toHaveReceivedEvent();
    expect(selectSpy).toHaveReceivedEventDetail({
      checked: true,
      value: 'cherries',
    });

    await secondRow.click();

    await page.waitForChanges();

    expect(selectSpy).toHaveReceivedEvent();
    expect(selectSpy).toHaveReceivedEventDetail({
      checked: false,
      value: 'cherries',
    });
  });

  it('should emit the currently selected values in an accordion when a row of that accordion is selected or unselected', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithSelection);
    const selectSpy = await page.spyOnEvent('b2b-group-selected');

    const secondRow = await page.find('#test-parent >>> b2b-checkbox');
    await secondRow.click();

    await page.waitForChanges();

    expect(selectSpy).toHaveReceivedEvent();
    expect(selectSpy).toHaveReceivedEventDetail({
      group: 'peaches',
      values: ['cherries', 'plums'],
    });

    const thirdRow = await page.find('#second-child >>> b2b-checkbox');
    await thirdRow.click();

    await page.waitForChanges();

    expect(selectSpy).toHaveReceivedEvent();
    expect(selectSpy).toHaveReceivedEventDetail({
      group: 'peaches',
      values: ['cherries'],
    });
  });

  it('should allow setting the colspan property on cells if the table size is colspan', async () => {
    page = await newE2EPage();
    await page.setContent(tableWithColspan);

    const header = await page.find({ text: 'Title 1 + 2' });
    const table = await page.find('b2b-table');
    const row = await page.find('b2b-table-row');
    const cell = await page.find({ text: 'data 2a + 3a' });

    expect(await cell.style.flexBasis).toBeDefined;
    expect(row).toHaveClass('b2b-table-row--colspan');
    expect(table).toHaveClass('b2b-table--colspan');
    expect(await header.getProperty('colspan')).toEqual(2);
  });
});
