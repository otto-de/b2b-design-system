import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { InputComponent } from './input';

it('should render the input', async () => {
  const page = await newSpecPage({
    components: [InputComponent],
    template: () => <b2b-input label="test"></b2b-input>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should render with a placeholder', async () => {
  const page = await newSpecPage({
    components: [InputComponent],
    template: () => (
      <b2b-input label="test" placeholder="test placeholder"></b2b-input>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint message if a hint string is specified', async () => {
  const page = await newSpecPage({
    components: [InputComponent],
    template: () => (
      <b2b-input label="test" hint="This is a test hint"></b2b-input>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should apply an error style to the host element if invalid is set to true', async () => {
  const page = await newSpecPage({
    components: [InputComponent],
    template: () => (
      <b2b-input label="test" error="This is a test error" invalid></b2b-input>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render an error message if an error is specified and the input is set to invalid', async () => {
  const page = await newSpecPage({
    components: [InputComponent],
    template: () => (
      <b2b-input label="test" error="This is a test error" invalid></b2b-input>
    ),
  });
  expect(page.root).toMatchSnapshot();
});

it('should render a hint if invalid and disabled are true at the same time', async () => {
  const page = await newSpecPage({
    components: [InputComponent],
    template: () => (
      <b2b-input
        label="test"
        error="This is a test error"
        hint="This is a test hint"
        invalid
        disabled></b2b-input>
    ),
  });
  expect(page.root).toMatchSnapshot();
});
