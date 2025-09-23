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
    let element = await page.find('b2b-dropdown');

    expect(element).not.toHaveClass('b2b-dropdown--disabled');

    element.setProperty('disabled', true);

    await page.waitForChanges();

    element = await page.find('b2b-dropdown');
    expect(element).toHaveClass('b2b-dropdown--disabled');
  });

  it('should set the select to invalid when the property is specified', async () => {
    let element = await page.find('b2b-dropdown');

    expect(element).not.toHaveClass('b2b-dropdown--error');

    element.setProperty('invalid', true);

    await page.waitForChanges();

    element = await page.find('b2b-dropdown');
    expect(element).toHaveClass('b2b-dropdown--error');
  });

  it('should clear the selection and reset to placeholder', async () => {
    let dropdown = await page.find('b2b-dropdown');

    await dropdown.callMethod('clearSelection');
    await page.waitForChanges();

    dropdown = await page.find('b2b-dropdown');
    const selectedTextElementAfter = await dropdown.shadowRoot.querySelector(
      '.b2b-dropdown__select',
    );
    expect(selectedTextElementAfter).not.toBeNull();
    expect(selectedTextElementAfter.textContent).toBe('Select an option...');
  });

  it('should render dynamically added <option> elements using MutationObserver', async () => {
    const page = await newE2EPage({
      html: `<b2b-dropdown label="Fruits"></b2b-dropdown>`,
    });

    await page.evaluate(() => {
      const dropdown = document.querySelector('b2b-dropdown');
      const opt1 = document.createElement('option');
      opt1.value = 'apple';
      opt1.textContent = 'Apple';

      const opt2 = document.createElement('option');
      opt2.value = 'banana';
      opt2.textContent = 'Banana';

      dropdown.appendChild(opt1);
      dropdown.appendChild(opt2);
    });

    const count = await page.evaluate(async () => {
      const dropdown = document.querySelector('b2b-dropdown');
      if (dropdown == null) return -1;

      await new Promise(resolve => setTimeout(resolve, 2000));

      const options = dropdown.querySelectorAll('option');
      return options.length;
    });

    expect(count).toBe(2);
    const dropdownPage = await page.$('b2b-dropdown');

    const renderedOptions = await dropdownPage.$$('option');

    const texts = await Promise.all(
      renderedOptions.map(opt => opt.evaluate(el => el.textContent?.trim())),
    );

    expect(texts).toContain('Apple');
    expect(texts).toContain('Banana');
  });
});
