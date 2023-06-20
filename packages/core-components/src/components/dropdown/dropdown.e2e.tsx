import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Dropdown', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-dropdown label="Test Dropdown">
          <option value="option-1" selected id="option-1">Option 1</option>
          <option value="option-2" id="option-2">Option 2</option>
      </b2b-dropdown>
    `);
  });

  it('should render the dropdown component', async () => {
    const element = await page.find('b2b-dropdown');
    expect(element).not.toBeNull();
  });

  it('should receive a custom event when an option is selected', async () => {
    const element = await page.find('b2b-dropdown');
    const b2bChange = await page.spyOnEvent('b2b-change');

    element.triggerEvent('b2b-change');

    await page.waitForChanges();

    expect(b2bChange).toHaveReceivedEvent();
  });

  // TODO: reimplement this test with new testing framework
  // it('should emit the selected value when an option is clicked', async () => {
  //   const b2bChange = await page.spyOnEvent('b2b-change');
  //
  //   page.select('b2b-dropdown', 'option-2');
  //
  //   await page.waitForChanges();
  //
  //   expect(b2bChange).toHaveReceivedEventDetail('option-2');
  // });

  it('should disable the select when the property is specified', async () => {
    const element = await page.find('b2b-dropdown');

    expect(element).not.toHaveClass('b2b-dropdown--disabled');

    element.setProperty('disabled', true);

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-dropdown--disabled');
  });

  it('should set the select to invalid when the property is specified', async () => {
    const element = await page.find('b2b-dropdown');

    expect(element).not.toHaveClass('b2b-dropdown--error');

    element.setProperty('invalid', true);

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-dropdown--error');
  });
});
