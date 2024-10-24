import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { BackgroundBoxComponent } from './background-box';

it('should render the background box with default values', async () => {
  const page = await newSpecPage({
    components: [BackgroundBoxComponent],
    template: () => <b2b-background-box>B2B Background Box</b2b-background-box>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-background-box class="b2b-background-box">
      <mock:shadow-root>
        <slot></slot>
      </mock:shadow-root>
      B2B Background Box
    </b2b-background-box>
		`);
});

it('should render the background box with fixed width', async () => {
  const page = await newSpecPage({
    components: [BackgroundBoxComponent],
    template: () => <b2b-background-box fixed-width={true}>B2B Background Box</b2b-background-box>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-background-box class="b2b-background-box b2b-background-box--fixed-width" fixed-width="">
      <mock:shadow-root>
        <slot></slot>
      </mock:shadow-root>
      B2B Background Box
    </b2b-background-box>
		`);
});

it('should render the background box without padding', async () => {
  const page = await newSpecPage({
    components: [BackgroundBoxComponent],
    template: () => <b2b-background-box no-padding={true}>B2B Background Box</b2b-background-box>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-background-box class="b2b-background-box b2b-background-box--no-padding" no-padding="">
      <mock:shadow-root>
        <slot></slot>
      </mock:shadow-root>
      B2B Background Box
    </b2b-background-box>
		`);
});
