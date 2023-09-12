import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Chip-Component', () => {
  it('should render the chip component', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find('.b2b-chip__clearIcon');
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();
  });

  it('should emit b2b-close event on clear icon click', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip"></b2b-chip-component>`,
    );

    const b2bClose = await page.spyOnEvent('b2b-close');

    const clearIcon = await page.find('.b2b-chip__clearIcon');

    await clearIcon.click();

    expect(b2bClose).toHaveReceivedEvent();
  });
});
