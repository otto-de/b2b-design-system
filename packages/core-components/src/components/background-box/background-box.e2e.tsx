import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Background-Box', () => {
  let page;
  it('should render background box component', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-background-box><b2b-paragraph>Background box component</b2b-paragraph></b2b-background-box>`,
    );
    const element = await page.find('b2b-background-box');
    expect(element).not.toBeNull();
    const style = await element.getComputedStyle();
    expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(style.border).toBe('1px solid rgb(196, 196, 196)');
  });

  it('should display content with padding', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-background-box>Background box component</b2b-background-box>`,
    );
    const element = await page.find('b2b-background-box');

    expect(element).toEqualText('Background box component');
    const style = await element.getComputedStyle();
    expect(style.padding).toBe('24px');
  });

  it('should display content without padding', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-background-box no-padding='true'>Background box component</b2b-background-box>`,
    );
    const element = await page.find('b2b-background-box');

    expect(element).toEqualText('Background box component');
    const style = await element.getComputedStyle();
    expect(style.padding).toBe('0px');
  });

  it('should set max width', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-background-box max-width='true' no-padding='true'>Background box component</b2b-background-box>`,
    );
    const element = await page.find('b2b-background-box');

    expect(element).toEqualText('Background box component');
    const style = await element.getComputedStyle();
    expect(style.maxWidth).toBe('1440px');
  });
  it('should remove specific borders when set to none', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-background-box border-top="none" border-right="none">Background box component</b2b-background-box>`,
    );
    const element = await page.find('b2b-background-box');
    const style = await element.getComputedStyle();
    expect(style.borderTop).toBe('0px none rgb(0, 0, 0)');
    expect(style.borderRight).toBe('0px none rgb(0, 0, 0)');
    expect(style.borderBottom).toBe('1px solid rgb(196, 196, 196)');
    expect(style.borderLeft).toBe('1px solid rgb(196, 196, 196)');
  });

  it('should remove all borders when all set to none', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-background-box
        border-top="none"
        border-right="none"
        border-bottom="none"
        border-left="none">
        Background box component
      </b2b-background-box>`,
    );
    const element = await page.find('b2b-background-box');
    const style = await element.getComputedStyle();
    expect(style.borderTop).toBe('0px none rgb(0, 0, 0)');
    expect(style.borderRight).toBe('0px none rgb(0, 0, 0)');
    expect(style.borderBottom).toBe('0px none rgb(0, 0, 0)');
    expect(style.borderLeft).toBe('0px none rgb(0, 0, 0)');
  });
});
