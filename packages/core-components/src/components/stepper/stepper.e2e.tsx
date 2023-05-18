import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Stepper', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-stepper></b2b-stepper>`);
  });

  it('should render stepper component', async () => {
    const element = await page.find('b2b-stepper');
    expect(element).not.toBeNull;
  });
});
