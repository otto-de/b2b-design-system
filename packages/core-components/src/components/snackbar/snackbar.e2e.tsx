import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Snackbar', () => {
  it('should render the snackbar component', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-snackbar description="test"></b2b-snackbar>`);

    const element = await page.find(
      'b2b-snackbar >>> .b2b-snackbar__content__description',
    );
    expect(element).not.toBeNull();
    expect(element.textContent).toBe('test');
  });

  it('should not be opened by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-snackbar></b2b-snackbar>`);

    const element = await page.find('b2b-snackbar >>> div.b2b-snackbar');
    expect(element).not.toHaveClass('b2b-snackbar--opened');

    const snackbar = await page.find('b2b-snackbar');

    expect(await snackbar.getProperty('opened')).toBe(false);
  });

  it('should make the snackbar opened', async () => {
    const page = await newE2EPage();

    await page.setContent(`<b2b-snackbar opened></b2b-snackbar>`);

    const element = await page.find('b2b-snackbar >>> div');

    expect(await element.isVisible()).toBe(true);
  });

  it('should render snackbar with CTA and close button', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<b2b-snackbar opened has-action="true" action-label="Call to action"></b2b-snackbar>`,
    );

    await page.waitForChanges();
    const b2bActionClick = await page.spyOnEvent('b2b-action-click');

    const snackbar = await page.find('b2b-snackbar');
    expect(await snackbar.isVisible()).toBe(true);

    const cta = await page.find('b2b-snackbar >>> div.b2b-snackbar__action');
    expect(cta).not.toBeNull();
    await cta.click();

    expect(b2bActionClick).toHaveReceivedEvent();
  });

  it('should render snackbar that disappears after certain amount of time', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-snackbar opened timed="true" duration="1000">test</b2b-snackbar>`,
    );

    const element = await page.find('b2b-snackbar >>> div');
    expect(await element.isVisible()).toBe(true);

    await new Promise(res => setTimeout(res, 2000));

    await page.waitForChanges();
    const snackbar = await page.find('b2b-snackbar');
    const isOpened = await snackbar.getProperty('opened');
    expect(isOpened).toBe(false);
  });

  it('if snackbar is of type error, cannot be timed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-snackbar opened type="error" timed="true" duration="1000"></b2b-snackbar>`,
    );

    const element = await page.find('b2b-snackbar >>> div');
    expect(await element.isVisible()).toBe(true);

    const closeIcon = await page.find(
      'b2b-snackbar >>> div.b2b-snackbar__close-icon',
    );
    expect(closeIcon).not.toBeNull();

    expect(element).toHaveClass('b2b-snackbar--opened');
    await element.hover();
    await page.mouse.move(0, 0);
    await new Promise(res => setTimeout(res, 3500));
    await page.waitForChanges();
    expect(element).toHaveClass('b2b-snackbar--opened');
  });
});
