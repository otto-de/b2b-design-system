import { newE2EPage } from '@stencil/core/testing';

describe('b2b-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-radio-button label="test" value="one"></b2b-radio-button>',
    );

    const element = await page.find('b2b-radio-button');

    expect(element).toBeDefined();
  });

  it('emits when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-radio-button label="test" value="one"></b2b-radio-button>',
    );

    const spy = await page.spyOnEvent('b2b-change');

    const element = await page.find('b2b-radio-button >>> input');

    await element.click();

    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
  });
});
