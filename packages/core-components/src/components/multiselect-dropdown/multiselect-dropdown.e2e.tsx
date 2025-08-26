import { newE2EPage } from '@stencil/core/testing';

describe('b2b-multiselect-dropdown', () => {
  it('should render with placeholder', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown placeholder="Select an option"></b2b-multiselect-dropdown>`,
    });

    const placeholder = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown__placeholder',
    );
    expect(placeholder).not.toBeNull();
    expect(placeholder).toEqualText('Select an option');
  });

  it('should render with hint message', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown hint="Choose wisely!"></b2b-multiselect-dropdown>`,
    });

    const hint = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown__hint',
    );
    const text = hint.textContent;
    expect(text).toBe('Choose wisely!');
  });

  it('should open dropdown on click and displays options', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown placeholder="Choose" options-list="Swift Carrot, Happy Onion, Cool Tomato"></b2b-multiselect-dropdown>`,
    });

    const trigger = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown',
    );
    await trigger.click();
    await page.waitForChanges();

    const allOptions = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );
    expect(allOptions.length).toBeGreaterThan(1);
    const checkbox = await allOptions[1].find('b2b-checkbox');
    await checkbox.click();

    const values = await Promise.all(
      allOptions.slice(1).map(async opt => {
        const cb = await opt.find('b2b-checkbox');
        return cb.getAttribute('value');
      }),
    );

    expect(values).toContain('Swift Carrot');
    expect(values).toContain('Happy Onion');
    expect(values).toContain('Cool Tomato');
  });

  it('should emit b2b-selected event on option select and render the chips', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown options-list="Alpha, Beta"></b2b-multiselect-dropdown>`,
    });

    const trigger = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown',
    );

    await page.waitForChanges();
    await trigger.click();
    await page.waitForChanges();

    const spy = await page.spyOnEvent('b2b-selected');
    const allOptions = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );
    const checkbox = await allOptions[1].find('b2b-checkbox');

    await checkbox.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();

    const chip = await page.find(
      'b2b-multiselect-dropdown >>> b2b-chip-component',
    );
    expect(chip).not.toBeNull();

    const valueHandle = await chip.getProperty('value');
    expect(valueHandle).toBe('Alpha');
  });

  it('should render two chips when select all is clicked', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown options-list="Alpha, Beta"></b2b-multiselect-dropdown>`,
    });

    const trigger = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown',
    );
    await page.waitForChanges();
    await trigger.click();
    await page.waitForChanges();

    const spy = await page.spyOnEvent('b2b-selected');
    const allOptions = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );
    const checkbox = await allOptions[0].find('b2b-checkbox');
    await checkbox.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();

    const chips = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-chip-component',
    );
    expect(chips.length).toBe(2);
  });

  it('should not increase in size when options are selected', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown options-list="Alpha, Beta"></b2b-multiselect-dropdown>`,
    });

    const trigger = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown',
    );

    await page.waitForChanges();

    const heightWithoutSelection = await page.evaluate(async () => {
      return window.getComputedStyle(
        document
          .querySelector('b2b-multiselect-dropdown')
          .shadowRoot.querySelector('.b2b-multiselect-dropdown'),
      ).height;
    });

    await trigger.click();
    await page.waitForChanges();
    const allOptions = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );
    const checkbox = await allOptions[0].find('b2b-checkbox');
    await checkbox.click();
    await page.waitForChanges();

    const heightWithSelection = await page.evaluate(() => {
      return window.getComputedStyle(
        document
          .querySelector('b2b-multiselect-dropdown')
          .shadowRoot.querySelector('.b2b-multiselect-dropdown'),
      ).height;
    });

    expect(heightWithoutSelection).toBe(heightWithSelection);
  });
});
