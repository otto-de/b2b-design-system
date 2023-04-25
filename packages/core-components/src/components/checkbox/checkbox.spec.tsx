import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { CheckboxComponent } from './checkbox';

it('should render the checkbox', async () => {
  const page = await newSpecPage({
    components: [CheckboxComponent],
    template: () => <b2b-checkbox label="test"></b2b-checkbox>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should disable the checkbox', async () => {
  const page = await newSpecPage({
    components: [CheckboxComponent],
    template: () => <b2b-checkbox label="test" disabled={true}></b2b-checkbox>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint message if a hint string is specified', async () => {
  const page = await newSpecPage({
    components: [CheckboxComponent],
    template: () => (
      <b2b-checkbox label="test" hint="this is a hint"></b2b-checkbox>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should apply an error style if it is marked as invalid.', async () => {
  const page = await newSpecPage({
    components: [CheckboxComponent],
    template: () => (
      <b2b-checkbox
        label="test"
        error="this is an error"
        invalid></b2b-checkbox>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render an error message if an error is specified and it is marked as invalid', async () => {
  const page = await newSpecPage({
    components: [CheckboxComponent],
    template: () => (
      <b2b-checkbox
        label="test"
        error="this is an error"
        invalid></b2b-checkbox>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint if  invalid and disabled are true at the same time', async () => {
  const page = await newSpecPage({
    components: [CheckboxComponent],
    template: () => (
      <b2b-checkbox
        label="test"
        error="This is a test error"
        hint="this is a test hint"
        invalid
        disabled></b2b-checkbox>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
