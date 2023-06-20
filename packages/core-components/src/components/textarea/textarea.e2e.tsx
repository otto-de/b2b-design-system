import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Textarea', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-textarea label="Test"></b2b-textarea>`);
  });

  it('should render the textarea component', async () => {
    const element = await page.find('b2b-textarea');

    expect(element).not.toBeNull();
  });

  it('should render the label', async () => {
    const label = await page.find({ text: 'Test' });

    expect(label).not.toBeNull();
  });

  it('should emit when the user types', async () => {
    const element = await page.find('b2b-textarea >>> textarea');
    const inputSpy = await page.spyOnEvent('b2b-input');

    await element.type('ABC');

    page.waitForChanges();

    expect(inputSpy).toHaveReceivedEvent();
  });

  it('should not allow typing when disabled', async () => {
    const textarea = `<b2b-textarea label="Test" disabled></b2b-textarea>`;

    page = await newE2EPage();
    await page.setContent(textarea);

    const element = await page.find('b2b-textarea >>> textarea');
    const inputSpy = await page.spyOnEvent('b2b-input');

    await element.type('ABC');

    expect(inputSpy).not.toHaveReceivedEvent();
  });

  it('should autofocus', async () => {
    const textarea = `<b2b-textarea label="Test" autofocus></b2b-textarea>`;

    page = await newE2EPage();
    await page.setContent(textarea);

    const element = await page.find('b2b-textarea');

    expect(element).toHaveAttribute('autofocus');
  });

  it('should display a hint text', async () => {
    const textarea = `<b2b-textarea label="Test" hint="A test hint"></b2b-textarea>`;

    page = await newE2EPage();
    await page.setContent(textarea);

    const hint = await page.find('b2b-textarea >>> span');

    expect(hint).toEqualText('A test hint');
  });

  it('should display an error text when the textarea is invalid', async () => {
    const textarea = `<b2b-textarea label="Test" error="A test error" invalid></b2b-textarea>`;

    page = await newE2EPage();
    await page.setContent(textarea);

    const error = await page.find('b2b-textarea >>> span');

    expect(error).toEqualText('A test error');
  });

  it('should not display a hint when an error message is present and the textarea is invalid', async () => {
    const textarea = `<b2b-textarea label="Test" error="A test error" hint="A test hint" invalid></b2b-textarea>`;

    page = await newE2EPage();
    await page.setContent(textarea);

    const error = await page.find('b2b-textarea >>> span');

    expect(error).toEqualText('A test error');
  });

  it('should not display an error if the textarea is invalid and disabled', async () => {
    const textarea = `<b2b-textarea label="Test" error="A test error" hint="A test hint" invalid disabled></b2b-textarea>`;

    page = await newE2EPage();
    await page.setContent(textarea);

    const hint = await page.find('b2b-textarea >>> span');

    expect(hint).toEqualText('A test hint');
  });

  it('should accept a maximum length', async () => {
    const textarea = `<b2b-textarea label="Test" max-length="10"></b2b-textarea>`;
    const input = 'An input with 27 characters';

    page = await newE2EPage();
    await page.setContent(textarea);

    const element = await page.find('b2b-textarea >>> textarea');

    await element.type(input);

    const value = await element.getProperty('value');

    expect(value).toEqual('An input w');
  });

  it('should support form building from the shadow DOM', async () => {
    const form = `<form>
        <b2b-textarea label="Test"></textarea>
        <button type="submit">Submit</button>
    </form>`;

    page = await newE2EPage();
    await page.setContent(form);

    const handleFormData = jest.fn();

    const formdataEventSpy = await page.spyOnEvent('formdata', handleFormData);

    await page.evaluate(() => {
      document.querySelector('button').click();
    });

    expect(formdataEventSpy).toHaveReceivedEvent();
  });
});
