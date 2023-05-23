import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { CardComponent } from './card';

it('should render the card with default values', async () => {
  const page = await newSpecPage({
    components: [CardComponent],
    template: () => <b2b-card>B2B Card</b2b-card>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-card class="b2b-card" tabindex="0">
      <mock:shadow-root>
        <slot></slot>
      </mock:shadow-root>
      B2B Card
    </b2b-card>
		`);
});

it('should disable the card', async () => {
  const page = await newSpecPage({
    components: [CardComponent],
    template: () => <b2b-card disabled={true}>B2B Card</b2b-card>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-card tabindex="-1" aria-disabled="true" class="b2b-card b2b-card--disabled">
      <mock:shadow-root>
        <div class="b2b-card--disabled-overlay"></div>
        <slot></slot>
      </mock:shadow-root>
      B2B Card
    </b2b-card>
		`);
});
