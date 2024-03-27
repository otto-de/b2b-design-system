import { newE2EPage } from '@stencil/core/testing';

describe('B2B Icon 100', () => {
  it('should render the icon', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-100 icon="b2b_icon-arrow-down"></b2b-icon-100>`,
    );

    const icon = await page.find('b2b-icon-100');
    const size = await icon.getProperty('size');

    expect(icon).not.toBe(null);
    expect(size).toBe(24);
  });

  it('should warn if the icon name is not supported', async () => {
    global.console.warn = jest.fn();

    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-100 icon="b2b_icon-not-supported-name"></b2b-icon-100>`,
    );

    expect(console.warn).toBeCalled();
  });

  it('should change size and warn if size is below 24 or above 96 pixels', async () => {
    global.console.warn = jest.fn();

    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-100 icon="b2b_icon-arrow-down" size="12"></b2b-icon-100>`,
    );

    expect(console.warn).toBeCalled();
  });

  it('should make the icon clickable', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-100 icon="b2b_icon-arrow-down" clickable></b2b-icon-100>`,
    );

    const icon = await page.find('b2b-icon-100');
    const clickable = await icon.getProperty('clickable');

    expect(clickable).toBe(true);
  });

  it('should make the icon focusable', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-100 icon="b2b_icon-arrow-down" focusable></b2b-icon-100>`,
    );

    const icon = await page.find('b2b-icon-100');
    const focusable = await icon.getProperty('focusable');
    const activeEl = await page.find('b2b-icon-100 >>> .b2b-icon-100');
    const tabIndex = activeEl.getAttribute('tabindex');

    expect(focusable).toBe(true);
    expect(tabIndex).toBe('0');
  });
});
