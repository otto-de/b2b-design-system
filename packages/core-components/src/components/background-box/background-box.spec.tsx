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

it('should render the background box with max width', async () => {
  const page = await newSpecPage({
    components: [BackgroundBoxComponent],
    template: () => (
      <b2b-background-box max-width={true}>
        B2B Background Box
      </b2b-background-box>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-background-box class="b2b-background-box b2b-background-box--max-width" max-width="">
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
    template: () => (
      <b2b-background-box no-padding={true}>
        B2B Background Box
      </b2b-background-box>
    ),
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

it('should render with no borders when specified', async () => {
  const page = await newSpecPage({
    components: [BackgroundBoxComponent],
    template: () => (
      <b2b-background-box
        border-top="none"
        border-right="none"
        border-bottom="none"
        border-left="none">
        B2B Background Box
      </b2b-background-box>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-background-box
      class="b2b-background-box b2b-background-box--hide-border-top b2b-background-box--hide-border-right b2b-background-box--hide-border-bottom b2b-background-box--hide-border-left"
      border-top="none"
      border-right="none"
      border-bottom="none"
      border-left="none">
      <mock:shadow-root>
        <slot></slot>
      </mock:shadow-root>
      B2B Background Box
    </b2b-background-box>
   `);
});
