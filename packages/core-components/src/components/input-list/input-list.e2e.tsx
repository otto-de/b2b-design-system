import { newE2EPage } from '@stencil/core/testing';

describe('B2B-InputList', () => {
  let page;
  const optionsList = ['option1', 'option2', 'option3'];

  const setOptionsList = async () => {
    const search = await page.find('b2b-input-list');
    search.setProperty('optionsList', optionsList);

    await page.waitForChanges();
  };

  const typeInput = async (key: string = '8') => {
    let input = await page.find('b2b-input-list >>> b2b-input');
    // focus on input element, focus method did not work
    await input.click();
    await input.press(key);
    await page.waitForChanges();
  };

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-input-list placeholder='some text'></b2b-input-list>
    `);
  });

  it('should register input text when enabled', async () => {
    await typeInput('8');

    const inputList = await page.find('b2b-input-list');

    let inputValue = inputList.getAttribute('value');

    expect(inputValue).toBe('8');
  });

  it('should not receive input text when disabled & should not show close icon', async () => {
    const inputList = await page.find('b2b-input-list');
    inputList.setAttribute('disabled', true);
    await page.waitForChanges();

    await typeInput();

    let inputValue = inputList.getAttribute('value');
    expect(inputValue).toBe(null);
    const closeIcon = await page.find('b2b-input-list >>> b2b-icon-100');
    expect(closeIcon).toBeNull();
  });

  it('should not not show close icon when input list has text and is disabled', async () => {
    await typeInput('b');
    await typeInput('2');
    await typeInput('b');
    const inputList = await page.find('b2b-input-list');

    inputList.setAttribute('disabled', true);
    await page.waitForChanges();

    let inputValue = inputList.getAttribute('value');
    expect(inputValue).toBe('b2b');
    const closeIcon = await page.find('b2b-input-list >>> b2b-icon-100');
    expect(closeIcon).toBeNull();
  });

  it('should not show search list when input is not focused', async () => {
    await setOptionsList();

    const searchListResults = await page.find({ text: optionsList[0] });

    expect(searchListResults).toBeNull();
  });

  it('should not show search list when no list is provided', async () => {
    const input = await page.find('b2b-input-list >>> b2b-input');
    await input.click();

    const searchListResults = await page.find({ text: optionsList[0] });
    expect(searchListResults).toBeNull();
  });

  it('should not show search list when the input has no value', async () => {
    await setOptionsList();

    const input = await page.find('b2b-input-list');
    // focus on input element, focus method did not work
    await input.click();
    await input.press('8');
    await page.waitForChanges();

    let searchListResults = await page.find({ text: optionsList[0] });
    expect(await searchListResults.isVisible()).toBe(true);

    await input.click();
    await input.press('Backspace');
    await page.waitForChanges();

    searchListResults = await page.find({ text: optionsList[0] });
    expect(searchListResults).toBeNull();
  });

  it('should show search list when input is focused, the input has value and list is provided in props', async () => {
    await setOptionsList();

    await typeInput();

    const searchListResults = await page.find({ text: optionsList[0] });
    expect(await searchListResults.isVisible()).toBe(true);
  });

  it('should emit selected option when it is selected', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');

    await setOptionsList();
    await typeInput();

    // Click first option on the list
    const option = await page.find({ text: optionsList[0] });
    // focus on input element, focus method did not work
    await option.click();

    expect(optionSelectedEventSpy).toHaveReceivedEvent();
    expect(optionSelectedEventSpy).toHaveReceivedEventDetail({
      selectedOption: optionsList[0],
    });
  });

  it('should hide results when one option is selected', async () => {
    await setOptionsList();
    await typeInput();

    // Click first option on the list
    const option = await page.find({ text: optionsList[0] });
    expect(await option.isVisible()).toBe(true);
    await option.click();

    const searchListResults = await page.find({ text: optionsList[0] });
    expect(searchListResults).toBeNull();
  });

  it('should fill up input value with option selected', async () => {
    await setOptionsList();
    await typeInput('8');

    const input = await page.find('b2b-input-list >>> b2b-input');

    let inputValue = await input.getProperty('value');
    expect(inputValue).toBe('8');

    // Click first option on the list
    const option = await page.find({ text: optionsList[0] });
    await option.click();

    inputValue = await input.getProperty('value');
    expect(inputValue).toBe(optionsList[0]);
  });

  it('should navigate with the arrow keys', async () => {
    await setOptionsList();
    await typeInput();

    await page.keyboard.press('ArrowDown');
    page.waitForChanges();
    await page.keyboard.press('ArrowDown');
    page.waitForChanges();

    const firstActiveEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(firstActiveEl).toEqualText('option2');

    await page.keyboard.press('ArrowUp');
    page.waitForChanges();

    const activeEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(activeEl).toEqualText('option1');
  });

  it('should navigate to the first option if the home key is pressed', async () => {
    await setOptionsList();
    await typeInput();

    await page.keyboard.press('ArrowDown');
    page.waitForChanges();
    await page.keyboard.press('ArrowDown');
    page.waitForChanges();

    const firstActiveEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(firstActiveEl).toEqualText('option2');

    await page.keyboard.press('Home');
    page.waitForChanges();

    const activeEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(activeEl).toEqualText('option1');
  });

  it('should navigate to the last option if the end key is pressed', async () => {
    await setOptionsList();
    await typeInput();

    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();

    const firstActiveEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(firstActiveEl).toEqualText('option1');

    await page.keyboard.press('End');
    await page.waitForChanges();

    const activeEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(activeEl).toEqualText('option3');
  });

  it('should not navigate with any other key than up, down, end or home', async () => {
    await setOptionsList();
    await typeInput();

    await page.keyboard.press('A');
    await page.waitForChanges();

    const firstActiveEl = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.textContent;
    });
    expect(firstActiveEl).not.toEqualText('option1');
  });

  it('should not navigate when the input is not visible', async () => {
    await setOptionsList();
    await page.waitForChanges();

    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();

    const searchListResults = await page.find({ text: optionsList[0] });

    expect(searchListResults).toBeNull();
  });

  it('should emit an option when it is focused and the enter key is pressed', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');
    await setOptionsList();
    await typeInput();

    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(optionSelectedEventSpy).toHaveReceivedEvent();
    expect(optionSelectedEventSpy).toHaveReceivedEventDetail({
      selectedOption: optionsList[0],
    });
  });

  it('should close the input list when the escape key is pressed', async () => {
    await setOptionsList();
    await typeInput();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    const searchListResults = await page.find({ text: optionsList[0] });

    expect(searchListResults).toBeNull();
  });

  it('should show the close icon when the input has text', async () => {
    await setOptionsList();
    await typeInput();

    const closeIcon = await page.find('b2b-input-list >>> b2b-icon-100');

    expect(closeIcon).not.toBeNull();
  });

  it('should not show the close icon if the input is empty', async () => {
    await setOptionsList();

    const closeIcon = await page.find('b2b-input-list >>> b2b-icon-100');

    expect(closeIcon).toBeNull();
  });

  it('should clear the input when the clear icon is clicked', async () => {
    await setOptionsList();
    await typeInput('8');

    let input = await page.find('b2b-input-list >>> b2b-input');
    let inputValue = await input.getAttribute('value');

    expect(inputValue).toBe('8');

    const closeIcon = await page.find('b2b-input-list >>> b2b-icon-100');

    await closeIcon.click();
    await page.waitForChanges();

    input = await page.find('b2b-input-list >>> b2b-input');
    inputValue = await input.getAttribute('value');
    expect(inputValue).toBe('');
  });

  it('should emit clear event when the clear icon is clicked', async () => {
    const onInputEventSpy = await page.spyOnEvent('b2b-clear');
    await typeInput();

    const closeIcon = await page.find('b2b-input-list >>> b2b-icon-100');

    await closeIcon.click();
    await page.waitForChanges();

    expect(onInputEventSpy).toHaveReceivedEvent();
  });
});
