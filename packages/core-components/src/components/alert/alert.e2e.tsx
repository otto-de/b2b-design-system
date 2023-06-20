import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Alert', () => {
  it('should render the alert component', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-alert></alert>`);

    const element = await page.find('b2b-alert');
    expect(element).not.toBeNull();
  });

  it('should not be visible by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-alert></alert>`);

    const element = await page.find('b2b-alert >>> div.b2b-alert');
    expect(element).not.toHaveClass('b2b-alert--open');

    const alert = await page.find('b2b-alert');

    expect(await alert.getProperty('opened')).toBe(false);
  });

  it('should open the alert', async () => {
    const page = await newE2EPage();

    await page.setContent(`<b2b-alert opened></b2b-alert>`);

    const element = await page.find('b2b-alert >>> div');

    expect(await element.isVisible()).toBe(true);
  });

  it('should not render text in a small alert', async () => {
    const page = await newE2EPage();

    await page.setContent(`<b2b-alert opened>test</b2b-alert>`);

    const element = await page.find('b2b-alert >>> p');

    expect(element).toBeNull();
  });

  it('should render a large alert with text', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-alert opened size={large}>test</b2b-alert>`);

    const element = await page.find({ text: 'test' });

    expect(element).not.toBeNull();
  });

  it('should render a close button by default in a large alert', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-alert opened size="large">test</b2b-alert>`);

    const alert = await page.find('b2b-alert >>> div');
    const element = await page.find('b2b-alert >>> div.b2b-alert-close-icon');

    expect(element).not.toBeNull();

    await page.evaluate(() => {
      (
        document
          .querySelector('b2b-alert')
          .shadowRoot.querySelector('.b2b-alert-close-icon') as HTMLElement
      ).click();
    });

    await page.waitForChanges();

    expect(await alert.isVisible()).toBeFalsy();
  });

  it('should not render a close button on an error alert', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-alert opened size="large" type="error">test</b2b-alert>`,
    );

    const element = await page.find('b2b-alert >>> div.b2b-alert-close-icon');

    expect(element).toBeNull();
  });

  it('should not render a close button in a small alert', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-alert opened>test</b2b-alert>`);

    const element = await page.find('b2b-alert >>> div.b2b-alert-close-icon');

    expect(element).toBeNull();
  });

  it('should render with a custom icon', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<b2b-alert opened custom-icon><b2b-icon icon="b2b_icon-menu"></b2b-icon></b2b-alert>`,
    );

    const element = await page.find('b2b-icon');

    expect(element).not.toBeNull();
  });
});
