import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Button', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-button>Hello World</b2b-button>`);
  });

  it('should render the button component', async () => {
    const element = await page.find('b2b-button');
    expect(element).not.toBeNull;
  });

  it('should display text', async () => {
    const element = await page.find('b2b-button');

    expect(element).toEqualText('Hello World');
  });

  it('should emit click event when clicked', async () => {
    const eventSpy = await page.spyOnEvent('click');

    await page.click('b2b-button');

    expect(eventSpy).toHaveReceivedEvent();
  });

  it('should not be able to click when disabled', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-button disabled={true}>Hello World</b2b-button>`,
    );
    const eventSpy = await page.spyOnEvent('click');

    await page.click('b2b-button');

    expect(eventSpy).not.toHaveReceivedEvent();
  });

  it('should not be able to click when loading', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-button loading={true}>Hello World</b2b-button>`,
    );
    const eventSpy = await page.spyOnEvent('click');

    await page.click('b2b-button');

    expect(eventSpy).not.toHaveReceivedEvent();
  });

  it('should support form submission from shadow dom', async () => {
    const form = `
      <form>
        <b2b-button type='submit'>Hello World</b2b-button>
      </form>
    `;
    page = await newE2EPage();
    await page.setContent(form);

    const submitEventSpy = await page.spyOnEvent('submit');
    const formdataEventSpy = await page.spyOnEvent('formdata');

    await page.click('b2b-button');

    expect(submitEventSpy).toHaveReceivedEvent();
    expect(formdataEventSpy).toHaveReceivedEvent();
  });

  it('should reduce padding on the button if there is only an icon', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-button variant="primary" size="100">
    <b2b-icon slot="end" icon="b2b_icon-check" size="100"></b2b-icon>
  </b2b-button>`);

    const button = await page.find('b2b-button');
    expect(button).toHaveClass('icon-only');
  });

  it('should not reduce padding on the button if there is text', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-button variant="primary" size="100">
    <span>Hello World</span>
    <b2b-icon slot="end" icon="b2b_icon-check" size="100"></b2b-icon>
  </b2b-button>`);

    const button = await page.find('b2b-button');
    expect(button).not.toHaveClass('icon-only');
  });

  it('should not submit a form when the button is not of type submit', async () => {
    const form = `
      <form>
        <b2b-button>Hello World</b2b-button>
      </form>
    `;
    page = await newE2EPage();
    await page.setContent(form);

    const submitEventSpy = await page.spyOnEvent('submit');
    const button = await page.find({ text: 'Hello World' });

    await button.click();
    page.waitForChanges();

    expect(submitEventSpy).not.toHaveReceivedEvent();
  });
});
