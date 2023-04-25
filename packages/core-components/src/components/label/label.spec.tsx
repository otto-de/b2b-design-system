import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { LabelComponent } from './label';

it('should render the label component with default values', async () => {
  const page = await newSpecPage({
    components: [LabelComponent],
    template: () => <b2b-label>Neutral</b2b-label>,
  });
  expect(page.root.shadowRoot).toEqualHtml(`
        <span class="b2b-label b2b-label--neutral">
            <slot></slot>
        </span>
    `);
});

it('should render the label component with info styles', async () => {
  const page = await newSpecPage({
    components: [LabelComponent],
    template: () => <b2b-label type="info">Neutral</b2b-label>,
  });
  expect(page.root.shadowRoot).toEqualHtml(`
          <span class="b2b-label b2b-label--info">
              <slot></slot>
          </span>
      `);
});

it('should render the label component with success styles', async () => {
  const page = await newSpecPage({
    components: [LabelComponent],
    template: () => <b2b-label type="success">Neutral</b2b-label>,
  });
  expect(page.root.shadowRoot).toEqualHtml(`
          <span class="b2b-label b2b-label--success">
              <slot></slot>
          </span>
      `);
});

it('should render the label component with warning styles', async () => {
  const page = await newSpecPage({
    components: [LabelComponent],
    template: () => <b2b-label type="warning">Neutral</b2b-label>,
  });
  expect(page.root.shadowRoot).toEqualHtml(`
          <span class="b2b-label b2b-label--warning">
              <slot></slot>
          </span>
      `);
});

it('should render the label component with error styles', async () => {
  const page = await newSpecPage({
    components: [LabelComponent],
    template: () => <b2b-label type="error">Neutral</b2b-label>,
  });
  expect(page.root.shadowRoot).toEqualHtml(`
          <span class="b2b-label b2b-label--error">
              <slot></slot>
          </span>
      `);
});
