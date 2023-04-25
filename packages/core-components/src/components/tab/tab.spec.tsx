import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bTabComponent } from './tab';

it('should match the snapshot', async () => {
  const page = await newSpecPage({
    components: [B2bTabComponent],
    template: () => <b2b-tab>Tab 1</b2b-tab>,
  });
  expect(page.root).toMatchSnapshot();
});

it('should not be selected by default', async () => {
  const page = await newSpecPage({
    components: [B2bTabComponent],
    template: () => <b2b-tab>Tab 1</b2b-tab>,
  });
  expect(page.rootInstance.selected).toBe(false);
});

it('should not have an error by default', async () => {
  const page = await newSpecPage({
    components: [B2bTabComponent],
    template: () => <b2b-tab>Tab 1</b2b-tab>,
  });
  expect(page.rootInstance.invalid).toBe(false);
});

it('should not be disabled by default', async () => {
  const page = await newSpecPage({
    components: [B2bTabComponent],
    template: () => <b2b-tab>Tab 1</b2b-tab>,
  });

  expect(page.rootInstance.disabled).toBe(false);
});
