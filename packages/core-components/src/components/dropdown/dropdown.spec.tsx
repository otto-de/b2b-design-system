import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { DropdownComponent } from './dropdown';

it('should render the dropdown', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => <b2b-dropdown label="test"></b2b-dropdown>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should render the dropdown with options', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => (
      <b2b-dropdown label="test">
        <option>An option</option>
      </b2b-dropdown>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint if a hint string is specified', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => (
      <b2b-dropdown label="test" hint="This is a test hint"></b2b-dropdown>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should disable the dropdown', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => <b2b-dropdown label="test" disabled></b2b-dropdown>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should apply an error style to the host element if an error is specified and the select is set to invalid', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => (
      <b2b-dropdown
        label="test"
        error="This is a test error"
        invalid></b2b-dropdown>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render an error message if an error is specified and the select is set to invalid', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => (
      <b2b-dropdown
        label="test"
        error="This is a test error"
        invalid></b2b-dropdown>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint if  invalid and disabled are true at the same time', async () => {
  const page = await newSpecPage({
    components: [DropdownComponent],
    template: () => (
      <b2b-dropdown
        label="test"
        error="This is a test error"
        hint="this is a test hint"
        invalid
        disabled></b2b-dropdown>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
