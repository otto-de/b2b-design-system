import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Checkbox-Group', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
            <b2b-checkbox-group label="test label">
                <b2b-checkbox label="one" value="one" error="test" hint="test"></b2b-checkbox>
            </b2b-checkbox-group>
        `);
  });

  it('should render the checkbox group component', async () => {
    const element = await page.find('b2b-checkbox-group');
    expect(element).not.toBeNull;
  });

  it('should have all checkboxes unchecked by default and check a checkbox', async () => {
    const element = await page.find('b2b-checkbox >>> .b2b-checkbox');

    await element.click();

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-checkbox-checked');
  });

  it('should receive a custom event', async () => {
    const element = await page.find('b2b-checkbox');
    const b2bChange = await page.spyOnEvent('b2b-change');

    element.triggerEvent('b2b-change', {
      detail: {
        value: '',
        checked: true,
      },
    });

    await page.waitForChanges();

    expect(b2bChange).toHaveReceivedEvent();
  });

  it('should emit a custom event when a checkbox is checked', async () => {
    const element = await page.find('b2b-checkbox >>> .b2b-checkbox');
    const b2bGroupChange = await page.spyOnEvent('b2b-group-change');

    element.click();

    await page.waitForChanges();

    // currently a limitation of Puppeteer - no event details on custom events inside the shadow dom
    expect(b2bGroupChange).toHaveReceivedEvent();
  });

  it('should disable all checkboxes when the property is specified', async () => {
    const parentElement = await page.find('b2b-checkbox-group');
    const element = await page.find('b2b-checkbox >>> .b2b-checkbox');

    expect(element).not.toHaveClass('b2b-checkbox--disabled');

    parentElement.setProperty('disabled', true);

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-checkbox--disabled');
  });

  it('should set all checkboxes to invalid when the property is specified', async () => {
    const parentElement = await page.find('b2b-checkbox-group');
    const element = await page.find('b2b-checkbox >>> .b2b-checkbox');

    expect(element).not.toHaveClass('b2b-checkbox--error');

    parentElement.setProperty('invalid', true);

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-checkbox--error');
  });

  it('should remove all children hint texts when the component is rendered', async () => {
    const element = await page.find('b2b-checkbox');
    const error = element.error;
    const hint = element.hint;

    expect(hint).not.toBeDefined;
    expect(error).not.toBeDefined;
  });
});
