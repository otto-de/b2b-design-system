import { newE2EPage } from '@stencil/core/testing';

describe('b2b-custom-dropdown', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-custom-dropdown placeholder="Select an option">
        <b2b-icon-100 icon="b2b_icon-ellipsis" slot='trigger' clickable focusable></b2b-icon-100>
        <b2b-custom-dropdown-option slot='option' option='option1' separator="true">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot='option' option='option2' separator="false">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot='option' option='option3' separator="false">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot='option' option='option4' separator="false">
        </b2b-custom-dropdown-option>
      </b2b-custom-dropdown>
    `);
  });

  it('should render with placeholder', async () => {
    const b2bInput = await page.find('b2b-custom-dropdown >>> b2b-input');
    expect(b2bInput).not.toBeNull();
    const placeholder = await b2bInput.getProperty('placeholder');
    expect(placeholder).toEqual('Select an option');
  });

  it('should show the dropdown options when trigger is clicked', async () => {
    const trigger = await page.find('b2b-custom-dropdown [slot="trigger"]');

    await trigger.click();
    await page.waitForChanges();

    const customDropdownOption = await page.find('b2b-custom-dropdown-option');

    expect(customDropdownOption).not.toBeNull();
    expect(await customDropdownOption.isVisible()).toBe(true);
  });

  it('should hide the dropdown when it loses focus', async () => {
    const trigger = await page.find('b2b-custom-dropdown [slot="trigger"]');

    await trigger.click();
    await page.waitForChanges();
    const customDropdownOption = await page.find('b2b-custom-dropdown-option');
    expect(await customDropdownOption.isVisible()).toBe(true);

    await page.keyboard.press('Tab');
    await page.waitForChanges();
    const dropdown = await page.find('b2b-custom-dropdown');
    expect(dropdown).not.toHaveClass('b2b-custom-dropdown--on');
  });

  it('should display separator after an option when separator is true', async () => {
    const trigger = await page.find('b2b-custom-dropdown [slot="trigger"]');

    await trigger.click();
    await page.waitForChanges();

    const dropdownOptions = await page.findAll('b2b-custom-dropdown-option');

    const agencyOption = dropdownOptions[0];
    const separatorAgencyOption = await agencyOption.getProperty('separator');
    expect(separatorAgencyOption).toBe(true);

    const option1 = dropdownOptions[1];
    const separatorOption1 = await option1.getProperty('separator');
    expect(separatorOption1).toBe(false);
  });

  it('should display the correct list of options', async () => {
    const trigger = await page.find('b2b-custom-dropdown [slot="trigger"]');
    await trigger.click();
    await page.waitForChanges();

    const dropdownOptions = await page.findAll('b2b-custom-dropdown-option');

    expect(dropdownOptions.length).toEqual(4);

    const optionTexts = await Promise.all(
      dropdownOptions.map(option => option.getProperty('option')),
    );
    expect(optionTexts).toEqual(['option1', 'option2', 'option3', 'option4']);
  });
});
