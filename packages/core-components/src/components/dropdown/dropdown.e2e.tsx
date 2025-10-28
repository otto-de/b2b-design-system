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

  it('ensure clear icon is visible', async () => {
    let dropdown = await page.find('b2b-dropdown');

    const clearIcon = await dropdown.shadowRoot.querySelector(
      '.b2b-dropdown__clear-icon',
    );
    expect(clearIcon).not.toBeNull();
  });

  it('ensure text is cleared when clear icon is clicked', async () => {
    const clearIcon = await page.find(
      'b2b-dropdown >>> b2b-icon-100.b2b-dropdown__clear-icon',
    );

    expect(clearIcon).not.toBeNull();

    await clearIcon.click();
    await page.waitForChanges();

    const selectDisplay = await page.find(
      'b2b-dropdown >>> .b2b-dropdown__select',
    );
    expect(await selectDisplay.textContent).not.toContain('Option 1');
    expect(await selectDisplay.textContent).toContain('Select an option...');
  });

  it('ensure text is cleared when clear icon is clicked when search is enabled', async () => {
    let dropdown = await page.find('b2b-dropdown');
    dropdown.setProperty('search', true);

    const clearIcon = await page.find(
      'b2b-dropdown >>> b2b-icon-100.b2b-dropdown__clear-icon',
    );

    expect(clearIcon).not.toBeNull();

    await clearIcon.click();
    await page.waitForChanges();

    const selectDisplay = await page.find('b2b-dropdown >>> .b2b-input');
    expect(await selectDisplay.textContent).not.toContain('Option 1');
    expect(await selectDisplay.textContent).toContain('');
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

  it('should filter options when search is enabled and user types in search input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <b2b-dropdown label="Search Fruits" search="true">
      <option value="apple" id="apple">Apple</option>
      <option value="banana" id="banana">Banana</option>
      <option value="cherry" id="cherry">Cherry</option>
      <option value="grape" id="grape">Grape</option>
      <option value="orange" id="orange">Orange</option>
    </b2b-dropdown>
  `);

    const dropdown = await page.find('b2b-dropdown');

    await dropdown.click();
    await page.waitForChanges();

    const searchInput = await page.find('b2b-dropdown >>> .b2b-input');
    expect(searchInput).not.toBeNull();

    await searchInput.focus();
    await searchInput.type('a');
    await page.waitForChanges();

    const visibleOptions = await page.findAll(
      'b2b-dropdown >>> .b2b-dropdown__option',
    );
    expect(visibleOptions.length).toBe(4);

    await searchInput.type('p');
    await page.waitForChanges();

    const filteredOptions = await page.findAll(
      'b2b-dropdown >>> .b2b-dropdown__option',
    );
    expect(filteredOptions.length).toBe(2);

    const optionTexts = await Promise.all(
      filteredOptions.map(async opt => await opt.getProperty('textContent')),
    );

    expect(optionTexts).toContain('Apple');
    expect(optionTexts).toContain('Grape');
  });
});
