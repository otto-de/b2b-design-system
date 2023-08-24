import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Separator', () => {
  let page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-separator></b2b-separator>`);

    const element = await page.find('b2b-separator');
    expect(element).not.toBeNull();
  });

  it('displays a vertical separator', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<div style="height: 18px;"><b2b-separator alignment="vertical"></b2b-separator></div>`,
    );

    const element = await page.find('b2b-separator >>> div');
    expect(element).toHaveClass('b2b-separator--vertical');
  });

  it('displays a horizontal separator', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<div style="width: 18px;"><b2b-separator alignment="horizontal"></b2b-separator></div>`,
    );

    const element = await page.find('b2b-separator >>> div');

    expect(element).toHaveClass('b2b-separator--horizontal');
  });
});
