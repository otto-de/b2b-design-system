import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { CheckboxGroupComponent } from './checkbox-group';

it('should render the checkbox group and not show a hint or an error unless specified', async () => {
  const page = await newSpecPage({
    components: [CheckboxGroupComponent],
    template: () => <b2b-checkbox-group label="test"></b2b-checkbox-group>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a group hint if a hint string is specified', async () => {
  const page = await newSpecPage({
    components: [CheckboxGroupComponent],
    template: () => (
      <b2b-checkbox-group
        label="test"
        hint="this is a test hint"></b2b-checkbox-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should not render a group hint if a hint string and an error are specified and the group is set to invalid', async () => {
  const page = await newSpecPage({
    components: [CheckboxGroupComponent],
    template: () => (
      <b2b-checkbox-group
        label="test"
        hint="this is a test hint"
        error="this is a test error"
        invalid></b2b-checkbox-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint if invalid and disabled are true at the same time', async () => {
  const page = await newSpecPage({
    components: [CheckboxGroupComponent],
    template: () => (
      <b2b-checkbox-group
        label="test"
        hint="this is a test hint"
        error="this is a test error"
        invalid
        disabled></b2b-checkbox-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should align the checkboxes horizontally if set to horizontal', async () => {
  const page = await newSpecPage({
    components: [CheckboxGroupComponent],
    template: () => (
      <b2b-checkbox-group
        label="test"
        alignment="horizontal"></b2b-checkbox-group>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
