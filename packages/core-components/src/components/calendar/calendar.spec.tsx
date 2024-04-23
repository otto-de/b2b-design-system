import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bCalendar } from './calendar';
import { B2bCalendarHeader } from './calendar-header';
import { B2bCalendarDaysHeader } from './calendar-days-header';
import { B2bCalenderDays } from './calender-days';

const months = [
  'Jan',
  'Feb',
  'Mär',
  'Apr',
  'Mai',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dez',
];

it('should go to the previous month on left arrow click', async () => {
  const page = await newSpecPage({
    components: [
      B2bCalendar,
      B2bCalendarHeader,
      B2bCalenderDays,
      B2bCalendarDaysHeader,
    ],
    template: () => <b2b-calendar></b2b-calendar>,
  });
  const clickableInputComponent: HTMLElement =
    page.root.shadowRoot.querySelector('.b2b-calender-input-wrapper');

  clickableInputComponent.click();
  await page.waitForChanges();
  const calendarHeader: HTMLElement = page.root.shadowRoot.querySelector(
    'b2b-calendar-header',
  );

  const thisMonth = new Date().getMonth();
  let calendarHeaderButton: HTMLElement =
    calendarHeader.shadowRoot.querySelector('.b2b-calendar-nav--left');

  let monthNameRenderedBeforeClick: HTMLElement =
    calendarHeader.shadowRoot.querySelector('.b2b-calendar-month');

  expect(monthNameRenderedBeforeClick.innerText).toBe(months[thisMonth]);

  calendarHeaderButton.click();

  await page.waitForChanges();

  let monthNameRendered: HTMLElement = calendarHeader.shadowRoot.querySelector(
    '.b2b-calendar-month',
  );
  expect(monthNameRendered.innerText).toBe(months[thisMonth - 1]);
});
it('should go to the next month on right arrow click', async () => {
  const page = await newSpecPage({
    components: [
      B2bCalendar,
      B2bCalendarHeader,
      B2bCalenderDays,
      B2bCalendarDaysHeader,
    ],
    template: () => <b2b-calendar></b2b-calendar>,
  });
  const clickableInputComponent: HTMLElement =
    page.root.shadowRoot.querySelector('.b2b-calender-input-wrapper');

  clickableInputComponent.click();
  await page.waitForChanges();
  const calendarHeader: HTMLElement = page.root.shadowRoot.querySelector(
    'b2b-calendar-header',
  );

  const thisMonth = new Date().getMonth();
  let calendarHeaderButton: HTMLElement =
    calendarHeader.shadowRoot.querySelector('.b2b-calendar-nav--right');

  let monthNameRenderedBeforeClick: HTMLElement =
    calendarHeader.shadowRoot.querySelector('.b2b-calendar-month');

  expect(monthNameRenderedBeforeClick.innerText).toBe(months[thisMonth]);

  calendarHeaderButton.click();

  await page.waitForChanges();

  let monthNameRendered: HTMLElement = calendarHeader.shadowRoot.querySelector(
    '.b2b-calendar-month',
  );
  expect(monthNameRendered.innerText).toBe(months[thisMonth + 1]);
});
