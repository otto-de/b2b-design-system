import { newE2EPage } from '@stencil/core/testing';
import { log } from 'console';

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

    const required = await page
      .find('b2b-multiselect-dropdown >>> b2b-input-label')
      .then(label => label.shadowRoot.querySelector('label'));
    expect(required).not.toHaveClass('b2b-input-label--required');
  });

  it('should render with given properties', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown
                label="The Label"
                options-list="Option 1, Option 2, Option 3"
                select-all-label="Select All"
                search-placeholder="Search..."
                hint="Choose wisely!"
                required="true"
                placeholder="Select an option">
             </b2b-multiselect-dropdown>`,
    });

    const placeholder = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown__placeholder',
    );

    expect(placeholder).not.toBeNull();
    expect(placeholder).toEqualText('Select an option');

    const required = await page
      .find('b2b-multiselect-dropdown >>> b2b-input-label')
      .then(label => label.shadowRoot.querySelector('label'));
    expect(required).toHaveClass('b2b-input-label--required');

    const hint = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown__hint',
    );
    const text = hint.textContent;
    expect(text).toBe('Choose wisely!');
  });

  it('should open dropdown on click and display options', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown
        placeholder="Choose"
        options-list="Swift Carrot, Happy Onion, Cool Tomato"
        select-all-label="Select All"
        search-placeholder="Search..."
        max-options-visible="2"
      >
      </b2b-multiselect-dropdown>`,
    });

    const trigger = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown',
    );
    await trigger.click();
    await page.waitForChanges();

    const searchDiv = await page.find(
      'b2b-multiselect-dropdown >>> .b2b-multiselect-dropdown__option__search input',
    );
    const allOptionsWithSelectAll = await page.findAll(
      'b2b-multiselect-dropdown >>> b2b-multiselect-option',
    );
    const selectAllCheckbox =
      await allOptionsWithSelectAll[0].find('b2b-checkbox');

    expect(searchDiv.getAttribute('placeholder')).toContain('Search...');
    expect(allOptionsWithSelectAll.length).toBe(4);
    expect(selectAllCheckbox.getAttribute('value')).toBe('Select All');

    const checkbox = await allOptionsWithSelectAll[1].find('b2b-checkbox');
    await checkbox.click();

    const values = await Promise.all(
      allOptionsWithSelectAll.slice(1).map(async opt => {
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

  it('should render only two chips and "..." when maxOptionsVisible is set to 2', async () => {
    const page = await newE2EPage({
      html: `<b2b-multiselect-dropdown options-list="Alpha, Beta, Gamma, Delta" max-options-visible="2"></b2b-multiselect-dropdown>`,
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
    expect(chips.length).toBe(3);
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
