import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Search', () => {
  let page;
  const optionsList = ['option1', 'option2', 'option3'];

  const setOptionsList = async () => {
    const search = await page.find('b2b-search');
    search.setProperty('optionsList', optionsList);

    await page.waitForChanges();
  };

  const typeInput = async (key: string = '8') => {
    let input = await page.find('b2b-search >>> b2b-input-list');
    // focus on input element, focus method did not work
    await input.click();
    await input.press(key);
    await page.waitForChanges();
  };

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-search placeholder='search here'></b2b-search>
    `);
  });

  it('should register input text when enabled', async () => {
    let search = await page.find('b2b-search');

    await typeInput('8');

    search = await page.find('b2b-search');
    let inputValue = search.getAttribute('value');
    expect(inputValue).toBe('8');
  });

  it('should not receive input text when disabled', async () => {
    const search = await page.find('b2b-search');

    search.setAttribute('disabled', true);
    await page.waitForChanges();

    await typeInput();

    let inputValue = search.getAttribute('value');
    expect(inputValue).toBe(null);
  });

  it('should emit search event when clicking search button', async () => {
    const searchEventSpy = await page.spyOnEvent('b2b-search');

    const button = await page.find('b2b-search >>> b2b-button');
    await button.click();

    expect(searchEventSpy).toHaveReceivedEvent();
  });

  it('should emit search event with search input data', async () => {
    const searchString = 'some search value';
    const searchEventSpy = await page.spyOnEvent('b2b-search');
    const searchInputEventSpy = await page.spyOnEvent('b2b-input');

    const input = await page.find('b2b-search >>> b2b-input-list');
    await input.triggerEvent('b2b-input', { detail: { value: searchString } });

    await page.waitForChanges();

    const button = await page.find('b2b-search >>> b2b-button');
    await button.click();

    expect(searchInputEventSpy).toHaveReceivedEvent();
    expect(searchEventSpy).toHaveReceivedEventDetail({
      searchTerm: searchString,
    });
  });

  it('should emit search event on enter press', async () => {
    const searchString = 'some search value';
    const searchEventSpy = await page.spyOnEvent('b2b-search');
    const searchInputEventSpy = await page.spyOnEvent('b2b-input');

    const input = await page.find('b2b-search >>> b2b-input-list');
    await input.triggerEvent('b2b-input', { detail: { value: searchString } });

    await page.waitForChanges();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    expect(searchInputEventSpy).toHaveReceivedEvent();
    expect(searchEventSpy).toHaveReceivedEventDetail({
      searchTerm: searchString,
    });
  });

  it('should emit input event when typing on input', async () => {
    const searchString = 'some search value';
    const inputEventSpy = await page.spyOnEvent('b2b-input');

    const input = await page.find('b2b-search >>> b2b-input-list');
    await input.triggerEvent('b2b-input', { detail: { value: searchString } });

    await page.waitForChanges();

    expect(inputEventSpy).toHaveReceivedEvent();
    expect(inputEventSpy).toHaveReceivedEventDetail({ value: searchString });
  });

  it('should emit selected option when clicking search button', async () => {
    await setOptionsList();
    const searchEventSpy = await page.spyOnEvent('b2b-search');

    const input = await page.find('b2b-search >>> b2b-input-list');
    // focus on input element, focus method did not work
    await input.click();
    await input.press('8');
    await page.waitForChanges();

    // Click first option on the list
    const option = await page.find({ text: optionsList[0] });
    await option.click();

    const button = await page.find('b2b-search >>> b2b-button');
    await button.click();

    expect(searchEventSpy).toHaveReceivedEventDetail({
      searchTerm: optionsList[0],
    });
  });
});
