import { newE2EPage } from '@stencil/core/testing';

describe('B2B Required Separator', () => {
  let page;

  it('should render', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-required-separator></b2b-required-separator>`);

    const element = await page.find('b2b-required-separator');
    expect(element).not.toBeNull();
  });

  it('should change the label', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-required-separator label="Required"></b2b-required-separator>`,
    );

    const element = await page.find({ text: 'Required' });
    const label = element.textContent;

    expect(label).toEqualText('Required');
  });
});
