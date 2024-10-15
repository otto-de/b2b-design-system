import { newE2EPage } from '@stencil/core/testing';
import { Months } from './calendar.types';

describe('B2B-Calendar-Months', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('should list all months', async () => {
    await page.setContent(`<b2b-calendar-months></b2b-calendar-months>`);
    const monthElements = (await page.findAll(
      'b2b-calendar-months >>> .b2b-calendar-month',
    )) as HTMLDivElement[];

    expect(monthElements.length).toBe(12);
    monthElements.forEach((monthElement, index) => {
      expect(monthElement.textContent).toBe(Months[index]);
    });
  });

  it('should show the selected month', async () => {
    await page.setContent(
      `<b2b-calendar-months selected-month="4"></b2b-calendar-months>`,
    );
    const selectedMonth = await page.find(
      'b2b-calendar-months >>> .b2b-calendar-month--selected',
    );
    expect(selectedMonth.textContent).toBe(Months[4]);
  });

  it('should emit month selected event when new month is selected', async () => {
    await page.setContent(
      `<b2b-calendar-months selected-month="10"></b2b-calendar-months>`,
    );
    const monthSelectedSpy = await page.spyOnEvent(
      'b2b-calendar-month-selected',
    );
    const monthElement = await page.find(
      'b2b-calendar-months >>> .b2b-calendar-month:nth-child(4)',
    );

    await monthElement.click();
    page.waitForChanges();

    expect(monthSelectedSpy).toHaveReceivedEvent();
    expect(monthSelectedSpy).toHaveReceivedEventDetail({ value: 3 });
  });

  it('should emit month selected event when selecting the same month', async () => {
    await page.setContent(
      `<b2b-calendar-months selected-month="3"></b2b-calendar-months>`,
    );
    const monthSelectedSpy = await page.spyOnEvent(
      'b2b-calendar-month-selected',
    );
    const monthElement = await page.find(
      'b2b-calendar-months >>> .b2b-calendar-month:nth-child(4)',
    );

    await monthElement.click();
    page.waitForChanges();

    expect(monthSelectedSpy).toHaveReceivedEvent();
    expect(monthSelectedSpy).toHaveReceivedEventDetail({ value: 3 });
  });
});
