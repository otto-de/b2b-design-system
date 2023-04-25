import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { RadioButtonGroupComponent } from './radio-group';

it('should render the checkbox group and not show a hint or an error unless specified', async () => {
  const page = await newSpecPage({
    components: [RadioButtonGroupComponent],
    template: () => (
      <b2b-radio-group label="test" name="radio-test"></b2b-radio-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a group hint if a hint string is specified', async () => {
  const page = await newSpecPage({
    components: [RadioButtonGroupComponent],
    template: () => (
      <b2b-radio-group
        label="test"
        hint="this is a test hint"
        name="radio-test"></b2b-radio-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a group error if a hint string and an error are specified and the group is set to invalid', async () => {
  const page = await newSpecPage({
    components: [RadioButtonGroupComponent],
    template: () => (
      <b2b-radio-group
        label="test"
        name="radio-test"
        hint="this is a test hint"
        error="this is a test error"
        invalid></b2b-radio-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should switch to horizontal alignment if specified', async () => {
  const page = await newSpecPage({
    components: [RadioButtonGroupComponent],
    template: () => (
      <b2b-radio-group
        label="test"
        name="radio-test"
        alignment="horizontal"></b2b-radio-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
