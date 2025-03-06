import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Multiselect-Dropdown', () => {
  let page;
  const optionsList = [
    'Swift Carrot',
    'Hydromelon',
    'Skyshroom',
    'Fortified Pumpkin',
    'Hyrule Herb',
    'Hylian Shroom',
    'Mighty Banana',
    'Endura Carrot',
    'Golden Apple',
  ];

  const setOptionsList = async () => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    multiselect.setProperty('optionsList', optionsList);
    await page.waitForChanges();
  };

  const setMaxChipAmount = async (chips: number) => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    multiselect.setProperty('maxOptionsVisible', chips);
    await page.waitForChanges();
  };

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-multiselect-dropdown
    placeholder="Please select..."
    search-placeholder="Search"
    select-all-label="Select All"
    label="Hylian fruits and vegetables"></b2b-multiselect-dropdown>`);
  });

  it('should render the multiselect dropdown', async () => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    await setOptionsList();

    const options = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );

    expect(options.length).toBe(10);
    expect(multiselect).not.toBeNull();
  });

  it('should select an option and display it as a chip', async () => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    const selectedSpy = await page.spyOnEvent('b2b-selected');
    await setOptionsList();

    await multiselect.click();
    await page.waitForChanges();

    const opt = await page.find(
      `b2b-multiselect-dropdown >>> b2b-multiselect-option >>> b2b-checkbox[value="${optionsList[0]}"]`,
    );

    await opt.click();

    await page.waitForChanges();

    const chip = await page.find(
      'b2b-multiselect-dropdown >>> b2b-chip-component',
    );
    const val = await chip.getProperty('value');

    expect(val).toEqualText(optionsList[0]);
    expect(selectedSpy).toHaveReceivedEvent();
    expect(selectedSpy).toHaveReceivedEventDetail(['Swift Carrot']);
  });

  it('should select all options and display them as chips', async () => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    const selectedSpy = await page.spyOnEvent('b2b-selected');

    await setOptionsList();
    await setMaxChipAmount(optionsList.length);

    await multiselect.click();
    await page.waitForChanges();

    const opt = await page.find(
      `b2b-multiselect-dropdown >>> b2b-multiselect-option >>> b2b-checkbox[value="Select All"]`,
    );

    await opt.click();
    await page.waitForChanges();

    const chips = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-chip-component',
    );

    expect(chips.length).toEqual(optionsList.length);
    expect(selectedSpy).toHaveReceivedEvent();
    expect(selectedSpy).toHaveReceivedEventDetail(optionsList);
  });

  it('should not display more chips than the maximum amount prop defines', async () => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    await setOptionsList();
    await setMaxChipAmount(4);

    await multiselect.click();
    await page.waitForChanges();

    const opt = await page.find(
      `b2b-multiselect-dropdown >>> b2b-multiselect-option >>> b2b-checkbox[value="Select All"]`,
    );

    await opt.click();
    await page.waitForChanges();

    const chips = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-chip-component',
    );

    // account for overflow chip
    expect(chips.length).toEqual(5);
  });

  /** TO DO: test chip closing
   * Puppeteer has issues, but manual testing in vanilla, Vue and React confirmed logic works */

  it('should filter options using the search', async () => {
    const multiselect = await page.find('b2b-multiselect-dropdown');
    await setOptionsList();

    await multiselect.click();
    await page.waitForChanges();

    const input = await page.find('b2b-multiselect-dropdown >>> input');

    await input.click();
    await input.press('b');
    await page.waitForChanges();

    const options = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );

    expect(options.length).toEqual(3);

    await input.press('Backspace');
    await page.waitForChanges();

    const optionsAfter = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );

    expect(optionsAfter.length).toEqual(10);
  });
});
