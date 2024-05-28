import { newE2EPage } from '@stencil/core/testing';

describe('B2B Icon 50', () => {
  it('should render the icon', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-50 icon="b2b_icon-arrow-down"></b2b-icon-50>`,
    );

    const icon = await page.find('b2b-icon-50');

    expect(icon).not.toBe(null);
  });

  it('should warn if the icon name is not supported', async () => {
    global.console.warn = jest.fn();

    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-50 icon="b2b_icon-not-supported-name"></b2b-icon-50>`,
    );

    expect(console.warn).toBeCalled();
  });

  it('should make the icon clickable', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-50 icon="b2b_icon-arrow-down" clickable></b2b-icon-50>`,
    );

    const icon = await page.find('b2b-icon-50');
    const clickable = await icon.getProperty('clickable');

    expect(clickable).toBe(true);
  });

  it('should make the icon focusable', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-icon-50 icon="b2b_icon-arrow-down" focusable></b2b-icon-50>`,
    );

    const icon = await page.find('b2b-icon-50');
    const focusable = await icon.getProperty('focusable');
    const activeEl = await page.find('b2b-icon-50 >>> .b2b-icon-50');
    const tabIndex = activeEl.getAttribute('tabindex');

    expect(focusable).toBe(true);
    expect(tabIndex).toBe('0');
  });
});
