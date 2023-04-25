import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bRadioButtonComponent } from './radio';

it('should render the radio button', async () => {
  const page = await newSpecPage({
    components: [B2bRadioButtonComponent],
    template: () => (
      <b2b-radio-button label="test" name="radio-test"></b2b-radio-button>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should disable the radio button', async () => {
  const page = await newSpecPage({
    components: [B2bRadioButtonComponent],
    template: () => (
      <b2b-radio-button
        label="test"
        name="radio-test"
        disabled={true}></b2b-radio-button>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint message if a hint string is specified', async () => {
  const page = await newSpecPage({
    components: [B2bRadioButtonComponent],
    template: () => (
      <b2b-radio-button
        label="test"
        name="radio-test"
        hint="this is a hint"></b2b-radio-button>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should apply an error style if it is marked as invalid.', async () => {
  const page = await newSpecPage({
    components: [B2bRadioButtonComponent],
    template: () => (
      <b2b-radio-button
        label="test"
        name="radio-test"
        error="this is an error"
        invalid></b2b-radio-button>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render an error message if an error is specified and it is marked as invalid', async () => {
  const page = await newSpecPage({
    components: [B2bRadioButtonComponent],
    template: () => (
      <b2b-radio-button
        label="test"
        name="radio-test"
        error="this is an error"
        invalid></b2b-radio-button>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
