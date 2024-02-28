import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bIcon } from './icon';

it('should render the icon with default values', async () => {
  const page = await newSpecPage({
    components: [B2bIcon],
    template: () => <b2b-icon icon="b2b_icon-search"></b2b-icon>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should gracefully fail if icon name is not found by not rendering icon and emitting a warning', async () => {
  // @ts-ignore
  global.console.warn = jest.fn();
  const page = await newSpecPage({
    components: [B2bIcon],
    // @ts-ignore
    template: () => <b2b-icon icon="b2b_some-typo"></b2b-icon>,
  });
  expect(page.root).toMatchSnapshot();
  expect(console.warn).toBeCalled();
});

it('should gracefully fail if icon is the wrong size', async () => {
  // @ts-ignore
  global.console.warn = jest.fn();
  const page = await newSpecPage({
    components: [B2bIcon],
    // @ts-ignore
    template: () => <b2b-icon icon="b2b_icon-edit" variant="50"></b2b-icon>,
  });
  expect(page.root).toMatchSnapshot();
  expect(console.warn).toBeCalled();
});
