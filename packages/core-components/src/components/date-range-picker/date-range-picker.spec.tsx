import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bDateRangePicker } from './date-range-picker';
import { ParagraphComponent } from '../paragraph/paragraph';

const MOCK_DATE = new Date('2025-11-15T12:00:00.000Z');
const RealDate = Date;

beforeAll(() => {
  // @ts-ignore
  global.Date = class extends RealDate {
    constructor(...args) {
      if (args.length === 0) {
        super(MOCK_DATE.getTime());
      } else {
        // @ts-ignore
        super(...args);
      }
    }

    static now() {
      return MOCK_DATE.getTime();
    }
  };
});

afterAll(() => {
  global.Date = RealDate;
});

it('should render the date-range-picker', async () => {
  const page = await newSpecPage({
    components: [B2bDateRangePicker],
    template: () => <b2b-date-range-picker></b2b-date-range-picker>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should display custom properties', async () => {
  const page = await newSpecPage({
    components: [B2bDateRangePicker, ParagraphComponent],
    template: () => (
      <b2b-date-range-picker
        label="Test"
        hint="Test"
        error="Error"></b2b-date-range-picker>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
