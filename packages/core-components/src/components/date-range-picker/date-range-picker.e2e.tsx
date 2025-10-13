import type { E2EPage } from '@stencil/core/testing';
import { newE2EPage } from '@stencil/core/testing';

describe('B2B-date-range-picker', () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-date-range-picker></b2b-date-range-picker>`);
  });

  function doWithHost(
    fn: (element: HTMLB2bDateRangePickerElement) => void,
  ): Promise<void> {
    return page
      .$eval('b2b-date-range-picker', fn)
      .then(async () => await page.waitForChanges());
  }

  it('should render the date picker component', async () => {
    const datePicker = await page.find('b2b-date-range-picker');
    const clickableInputComponent = await page.find(
      'b2b-date-range-picker >>> div.b2b-date-range-picker-input-wrapper',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(datePicker).not.toBeNull();
  });

  it('should render the datepicker component when date picker icon is clicked', async () => {
    const datePicker = await page.find('b2b-date-range-picker');
    const wrapper = await page.find(
      'b2b-date-range-picker >>> div.b2b-date-range-picker-input-wrapper',
    );

    await wrapper.click();
    await page.waitForChanges();

    const datePickerComponent = await page.find(
      'b2b-date-range-picker >>> .b2b-date-range-picker-body',
    );
    const datePickerHeader = await page.find(
      'b2b-date-range-picker >>> .b2b-date-range-picker-body >>> b2b-date-range-picker-header',
    );
    const datePickerDays = await page.find(
      'b2b-date-range-picker >>> .b2b-date-range-picker-body >>> b2b-date-range-picker-days',
    );

    expect(wrapper).not.toBeNull();
    expect(datePicker).not.toBeNull();

    expect(datePickerComponent).not.toBeNull();
    expect(datePickerHeader).not.toBeNull();
    expect(datePickerDays).not.toBeNull();
    expect(await datePickerComponent.isVisible()).toBe(true);
    expect(await datePickerHeader.isVisible()).toBe(true);
    expect(await datePickerDays.isVisible()).toBe(true);
  });

  it('should disable the third day of each month', async () => {
    await doWithHost(
      el => (el.disableDates = (date: Date) => date.getDate() === 3),
    );

    const enabledElement = await page.find({ text: '1' });
    expect(enabledElement).toHaveClass('b2b-date-range-picker-day');
    expect(enabledElement).not.toHaveClass(
      'b2b-date-range-picker-day--disabled',
    );

    const disabledElement = await page.find({ text: '3' });
    expect(disabledElement).toHaveClass('b2b-date-range-picker-day');
    expect(disabledElement).toHaveClass('b2b-date-range-picker-day--disabled');
  });
});
