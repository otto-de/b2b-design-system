import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2bTabPanelComponent } from './tab-panel';

it('should match the snapshot', async () => {
  const page = await newSpecPage({
    components: [B2bTabPanelComponent],
    template: () => <b2b-tab-panel>Tab 1</b2b-tab-panel>,
  });
  expect(page.root).toMatchSnapshot();
});
