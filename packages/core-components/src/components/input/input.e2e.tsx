import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Input', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-input></b2b-input>
    `);
  });

  it('should clear input when cleared called', async () => {
    const inputElement = await page.find('b2b-input');

    const nativeInput = await page.find('b2b-input >>> input');
    await nativeInput.type('a value');

    let inputValue = inputElement.getAttribute('value');
    expect(inputValue).toBe('a value');

    await inputElement.callMethod('clearInput');
    await page.waitForChanges();

    inputValue = inputElement.getAttribute('value');
    expect(inputValue).toBe('');
  });

  it('should emit an empty value when cleared', async () => {
    const onInputEventSpy = await page.spyOnEvent('b2b-input');

    const inputElement = await page.find('b2b-input');
    await inputElement.callMethod('clearInput');

    expect(onInputEventSpy).toHaveReceivedEventDetail({ value: '' });
  });
});
