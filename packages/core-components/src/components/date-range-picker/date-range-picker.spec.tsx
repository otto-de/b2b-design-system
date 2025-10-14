import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bDateRangePicker } from './date-range-picker';
import { ParagraphComponent } from '../paragraph/paragraph';

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
