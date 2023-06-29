import { newE2EPage } from '@stencil/core/testing';

describe('b2b-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="false">Test</b2b-modal>',
    );
    const element = await page.find('b2b-modal');
    expect(element).toHaveClass('hydrated');

    const modalDiv = await page.find('b2b-modal >>> div');
    expect(await modalDiv.isVisible()).toBe(false);
  });

  it('open modal & heading', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );
    const modalDiv = await page.find('b2b-modal >>> div');
    expect(await modalDiv.isVisible()).toBe(true);

    const headingElm = await modalDiv.find('b2b-headline');
    expect(headingElm.textContent).toBe('Test Modal');
  });

  it('verify initial focus', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );

    const modalDiv = await page.find('b2b-modal >>> div');
    expect(await modalDiv.isVisible()).toBe(true);

    await page.keyboard.press('Tab');

    const closeContent = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.className;
    });
    expect(closeContent).toBe('b2b-modal__dialog__close');
  });

  it('verify focus trap', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );
    const modalDiv = await page.find('b2b-modal >>> div');
    expect(await modalDiv.isVisible()).toBe(true);

    await page.keyboard.press('Tab');

    let closeContent = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.className;
    });
    expect(closeContent).toBe('b2b-modal__dialog__close');

    await page.keyboard.press('Tab');

    closeContent = await page.evaluate(() => {
      return document.activeElement.shadowRoot.activeElement.className;
    });
    expect(closeContent).toBe('b2b-modal__dialog__close');
  });

  it('verify close hover', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );
    const modalDiv = await page.find('b2b-modal >>> div');
    expect(await modalDiv.isVisible()).toBe(true);

    const closeIcon = await page.find('b2b-modal >>> b2b-icon');

    const closeIconColorBefore = await closeIcon.getProperty('color');
    expect(closeIconColorBefore).toBe('secondary');

    await closeIcon.hover();

    await page.waitForChanges();

    const closeIconColorAfter = await closeIcon.getProperty('color');
    expect(closeIconColorAfter).toBe('primary');
  });

  it('verify close emit', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );

    const b2bBeforeClose = await page.spyOnEvent('b2b-before-close');
    const b2bClose = await page.spyOnEvent('b2b-close');

    const closeIcon = await page.find('b2b-modal >>> b2b-icon');

    await closeIcon.click();
    expect(b2bBeforeClose).toHaveReceivedEvent();
    expect(b2bClose).toHaveReceivedEvent();
  });

  it('verify esc emit', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );

    const b2bBeforeClose = await page.spyOnEvent('b2b-before-close');
    const b2bClose = await page.spyOnEvent('b2b-close');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    expect(b2bBeforeClose).toHaveReceivedEvent();
    expect(b2bClose).toHaveReceivedEvent();
  });

  it('verify esc no-emit', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true" esc-dismiss="false">Test</b2b-modal>',
    );

    const b2bBeforeClose = await page.spyOnEvent('b2b-before-close');
    const b2bClose = await page.spyOnEvent('b2b-close');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    expect(b2bBeforeClose).not.toHaveReceivedEvent();
    expect(b2bClose).not.toHaveReceivedEvent();
  });

  it('verify backdrop dismiss emit', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true" backdrop-dismiss="true">Test</b2b-modal>',
    );

    const b2bBeforeClose = await page.spyOnEvent('b2b-before-close');
    const b2bClose = await page.spyOnEvent('b2b-close');

    await page.evaluate(() => {
      (
        document
          .querySelector('b2b-modal')
          .shadowRoot.querySelector(
            'div > div.b2b-modal__backdrop',
          ) as HTMLElement
      ).click();
    });

    expect(b2bBeforeClose).toHaveReceivedEvent();
    expect(b2bClose).toHaveReceivedEvent();
  });

  it('verify backdrop dismiss not emit', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<b2b-modal heading="Test Modal" opened="true">Test</b2b-modal>',
    );

    const b2bBeforeClose = await page.spyOnEvent('b2b-before-close');
    const b2bClose = await page.spyOnEvent('b2b-close');

    await page.evaluate(() => {
      (
        document
          .querySelector('b2b-modal')
          .shadowRoot.querySelector(
            'div > div.b2b-modal__backdrop',
          ) as HTMLElement
      ).click();
    });

    expect(b2bBeforeClose).not.toHaveReceivedEvent();
    expect(b2bClose).not.toHaveReceivedEvent();
  });
});
