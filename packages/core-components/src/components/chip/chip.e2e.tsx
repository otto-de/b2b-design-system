import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Chip-Component', () => {
  it('should render the chip component', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();
  });

  it('should render the chip component with success type', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" type="success"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const chipWrapper = await page.find('b2b-chip-component >>> .b2b-chip');
    expect(chipWrapper).toHaveClass('b2b-chip--success');
  });

  it('should render the chip component with info type', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" type="info"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const chipWrapper = await page.find('b2b-chip-component >>> .b2b-chip');
    expect(chipWrapper).toHaveClass('b2b-chip--info');
  });

  it('should render the chip component with warning type', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" type="warn"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const chipWrapper = await page.find('b2b-chip-component >>> .b2b-chip');
    expect(chipWrapper).toHaveClass('b2b-chip--warn');
  });

  it('should render the chip component with error type', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" type="error"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const chipWrapper = await page.find('b2b-chip-component >>> .b2b-chip');
    expect(chipWrapper).toHaveClass('b2b-chip--error');
  });

  it('should render the chip component with bold label', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" label-style="bold"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const label = await page.find('b2b-chip-component >>> .b2b-chip__label');
    expect(label).toHaveClass('b2b-chip__label--bold');
  });

  it('should render the chip component with italic label', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" label-style="italic"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const label = await page.find('b2b-chip-component >>> .b2b-chip__label');
    expect(label).toHaveClass('b2b-chip__label--italic');
  });

  it('should render the chip component with underlined label', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" label-style="underline"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const label = await page.find('b2b-chip-component >>> .b2b-chip__label');
    expect(label).toHaveClass('b2b-chip__label--underline');
  });

  it('should render the chip component with strikethrough label', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip" label-style="strikethrough"></b2b-chip-component>`,
    );

    const chip = await page.find({ text: 'chip' });
    const clearIcon = await page.find(
      'b2b-chip-component >>> button.b2b-chip__clearIcon',
    );
    expect(chip).not.toBeNull();
    expect(clearIcon).not.toBeNull();

    const label = await page.find('b2b-chip-component >>> .b2b-chip__label');
    expect(label).toHaveClass('b2b-chip__label--strikethrough');
  });

  it('should truncate chip text when max width is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component
        label="chip with a very long label that should truncate"
        max-width="100px"></b2b-chip-component>`,
    );

    const metrics = await page.$eval('b2b-chip-component', host => {
      const chip = host.shadowRoot.querySelector('.b2b-chip');
      const label = host.shadowRoot.querySelector('.b2b-chip__label');

      return {
        chipMaxWidth: getComputedStyle(chip).maxWidth,
        labelTextOverflow: getComputedStyle(label).textOverflow,
        labelClientWidth: label.clientWidth,
        labelScrollWidth: label.scrollWidth,
      };
    });

    expect(metrics.chipMaxWidth).toBe('100px');
    expect(metrics.labelTextOverflow).toBe('ellipsis');
    expect(metrics.labelScrollWidth).toBeGreaterThan(metrics.labelClientWidth);
  });

  it('should emit b2b-close event on clear icon click', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-chip-component label="chip"></b2b-chip-component>`,
    );

    const b2bClose = await page.spyOnEvent('b2b-close');

    const clearIcon = await page.find(
      'b2b-chip-component >>>  button.b2b-chip__clearIcon',
    );

    await clearIcon.click();

    expect(b2bClose).toHaveReceivedEvent();
  });
});
