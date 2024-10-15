import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Calendar-Years', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('should list all years', async () => {
    await page.setContent(`<b2b-calendar-years></b2b-calendar-years>`);
    const monthElements = (await page.findAll(
      'b2b-calendar-years >>> .b2b-calendar-year',
    )) as HTMLDivElement[];
    const expectedYearsRange: string[] = Array.from(
      { length: 2100 - 1900 + 1 },
      (_, index) => (1900 + index).toString(),
    );

    expect(monthElements.length).toBe(201);
    monthElements.forEach((monthElement, index) => {
      expect(monthElement.textContent).toBe(expectedYearsRange[index]);
    });
  });

  it('should show the selected year', async () => {
    await page.setContent(
      `<b2b-calendar-years selected-year="2024"></b2b-calendar-years>`,
    );
    const selectedYear = await page.find(
      'b2b-calendar-years >>> .b2b-calendar-year--selected',
    );
    expect(selectedYear.textContent).toBe('2024');
  });

  it('should emit year selected event when new year is selected', async () => {
    await page.setContent(
      `<b2b-calendar-years selected-year="1970"></b2b-calendar-years>`,
    );
    const yearSelectedSpy = await page.spyOnEvent('b2b-calendar-year-selected');
    const yearElement = await page.find(
      'b2b-calendar-years >>> .b2b-calendar-year:nth-child(125)',
    );

    await yearElement.click();
    page.waitForChanges();

    expect(yearSelectedSpy).toHaveReceivedEvent();
    expect(yearSelectedSpy).toHaveReceivedEventDetail({ value: 2024 });
  });

  it('should emit year selected event when selecting the same year', async () => {
    await page.setContent(
      `<b2b-calendar-years selected-year="2024"></b2b-calendar-years>`,
    );
    const yearSelectedSpy = await page.spyOnEvent('b2b-calendar-year-selected');
    const yearElement = await page.find(
      'b2b-calendar-years >>> .b2b-calendar-year:nth-child(125)',
    );

    await yearElement.click();
    page.waitForChanges();

    expect(yearSelectedSpy).toHaveReceivedEvent();
    expect(yearSelectedSpy).toHaveReceivedEventDetail({ value: 2024 });
  });
});
