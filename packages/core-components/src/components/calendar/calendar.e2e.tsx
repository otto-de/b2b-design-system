import { newE2EPage } from '@stencil/core/testing';

//ToDo Rewrite the tests so that the next, previous button and date selection scenarios are also tested
describe('B2B-Calendar', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-calendar></b2b-calendar>`);
  });

  it('should render the calendar component', async () => {
    const calendar = await page.find('b2b-calendar');
    const clickableInputComponent = await page.find(
      'b2b-calendar >>> div.b2b-calendar-input-wrapper',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(calendar).not.toBeNull();
  });

  it('should render the datepicker component when calendar icon is clicked', async () => {
    const calendar = await page.find('b2b-calendar');
    const clickableInputComponent = await page.find(
      'b2b-calendar >>> div.b2b-calendar-input-wrapper',
    );

    await clickableInputComponent.click();
    await page.waitForChanges();

    const datePickerComponent = await page.find(
      'b2b-calendar >>> .b2b-calendar-body',
    );
    const datePickerHeader = await page.find(
      'b2b-calendar >>> .b2b-calendar-body >>> b2b-calendar-header',
    );
    const datePickerDays = await page.find(
      'b2b-calendar >>> .b2b-calendar-body >>> b2b-calendar-days',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(calendar).not.toBeNull();

    expect(datePickerComponent).not.toBeNull();
    expect(datePickerHeader).not.toBeNull();
    expect(datePickerDays).not.toBeNull();
    expect(await datePickerComponent.isVisible()).toBe(true);
    expect(await datePickerHeader.isVisible()).toBe(true);
    expect(await datePickerDays.isVisible()).toBe(true);
  });

  it('should disable past dates', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-calendar disable-past-dates=true></b2b-calendar>`,
    );
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const prevDay = yesterday.getDate();

    if (prevDay > 0 && prevDay >= 30) {
      const prevDayElement = await page.find({ text: prevDay.toString() });
      expect(prevDayElement.className).toBe(
        'b2b-calendar-day b2b-calendar-day--disabled',
      );
    }
  });
  it('should disable future dates', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-calendar disable-future-dates=true></b2b-calendar>`,
    );
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextDay = tomorrow.getDate();

    if (nextDay > 0 && nextDay !== 1) {
      const nextDayElement = await page.find({ text: nextDay.toString() });
      expect(nextDayElement.className).toBe(
        'b2b-calendar-day b2b-calendar-day--disabled',
      );
    }
  });
  it('should disable weekends dates', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-calendar disable-weekends=true></b2b-calendar>`,
    );
    const previousSunday = new Date().getDate() - (new Date().getDay() % 0);

    if (previousSunday > 0) {
      const prevDayElement = await page.find({
        text: previousSunday.toString(),
      });
      expect(prevDayElement.className).toBe(
        'b2b-calendar-day b2b-calendar-day--disabled',
      );
    }
  });
});
