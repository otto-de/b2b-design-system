import { newE2EPage } from '@stencil/core/testing';

describe('B2B-TimePicker', () => {
  it('should render the time picker component', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-time-picker label="Time Picker"></b2b-time-picker>`,
    );
    const element = await page.find('b2b-time-picker');
    expect(element).toHaveClass('hydrated');
  });

  it('should display the label', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-time-picker label="Time Picker"></b2b-time-picker>`,
    );
    const label = await page.find('b2b-time-picker >>> b2b-input-label');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Time Picker');
  });

  it('should open the dropdown on input focus', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker></b2b-time-picker>`);
    await page.$eval('b2b-time-picker', el => {
      const input = el.shadowRoot.querySelector('input');
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    });
    await page.waitForChanges();

    const optionsContainer = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__options-container--visible',
    );
    expect(optionsContainer).not.toBeNull();
  });

  it('should select a time from the dropdown', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker></b2b-time-picker>`);
    await page.$eval('b2b-time-picker', el => {
      const input = el.shadowRoot.querySelector('input');
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    });
    await page.waitForChanges();
    const option = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__option[data-value="09:00"]',
    );
    await option.click();
    await page.waitForChanges();
    const value = await page.$eval('b2b-time-picker', el => el.value);
    expect(value).toBe('09:00');
  });

  it('should clear the input when clear icon is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker value="10:15"></b2b-time-picker>`);
    const clearIcon = await page.find('b2b-time-picker >>> .b2b-close-icon');
    await clearIcon.click();
    await page.waitForChanges();
    const value = await page.$eval('b2b-time-picker', el => el.value);
    expect(value).toBe('');
  });

  it('should show error message for invalid input', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker></b2b-time-picker>`);
    const input = await page.find('b2b-time-picker >>> input');
    await input.type('99:99');
    await page.evaluate(() => {
      const el = document
        .querySelector('b2b-time-picker')
        .shadowRoot.querySelector('input');
      el.blur();
    });
    await page.waitForChanges();
    const error = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__hint--error',
    );
    expect(error).not.toBeNull();
    expect(error.textContent).toContain('Invalid format');
  });

  it('should generate correct time options for a custom interval', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker interval="30"></b2b-time-picker>`);
    await page.$eval('b2b-time-picker', el => {
      const input = el.shadowRoot.querySelector('input');
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    });
    await page.waitForChanges();
    const options = await page.findAll(
      'b2b-time-picker >>> .b2b-time-picker__option',
    );
    expect(options.length).toBe(48);
    expect(options[0].textContent).toBe('00:00');
    expect(options[1].textContent).toBe('00:30');
    expect(options[2].textContent).toBe('01:00');
  });

  it('should not break when selecting an already selected time', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker value="08:00"></b2b-time-picker>`);
    await page.$eval('b2b-time-picker', el => {
      const input = el.shadowRoot.querySelector('input');
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    });
    await page.waitForChanges();
    const option = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__option[data-value="08:00"]',
    );
    await option.click();
    await page.waitForChanges();
    const value = await page.$eval('b2b-time-picker', el => el.value);
    expect(value).toBe('08:00');
  });

  it('should toggle dropdown on duration icon click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker></b2b-time-picker>`);
    const icon = await page.find('b2b-time-picker >>> .b2b-duration-icon');
    await icon.click();
    await page.waitForChanges();
    let optionsContainer = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__options-container--visible',
    );
    expect(optionsContainer).not.toBeNull();
    await icon.click();
    await page.waitForChanges();
    optionsContainer = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__options-container--visible',
    );
    expect(optionsContainer).toBeNull();
  });

  it('should close the dropdown on blur', async () => {
    const page = await newE2EPage();
    await page.setContent(`<b2b-time-picker></b2b-time-picker>`);
    await page.$eval('b2b-time-picker', el => {
      const input = el.shadowRoot.querySelector('input');
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    });
    await page.waitForChanges();
    await page.$eval('b2b-time-picker', el => {
      const input = el.shadowRoot.querySelector('input');
      input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    });
    await new Promise(res => setTimeout(res, 200));
    const optionsContainer = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__options-container--visible',
    );
    expect(optionsContainer).toBeNull();
  });

  it('should show custom error message via error prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-time-picker error="Custom error" invalid></b2b-time-picker>`,
    );
    const error = await page.find(
      'b2b-time-picker >>> .b2b-time-picker__hint--error',
    );
    expect(error.textContent).toContain('Custom error');
  });

  it('should display the hint text when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-time-picker hint="Pick a time"></b2b-time-picker>`,
    );
    const hint = await page.find('b2b-time-picker >>> .b2b-time-picker__hint');
    expect(hint.textContent).toContain('Pick a time');
  });
});
