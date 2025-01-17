import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { AnchorComponent } from './anchor';

const testRef = 'https://www.otto.de';

it('should render the anchor component with default values', async () => {
  const page = await newSpecPage({
    components: [AnchorComponent],
    template: () => (
      <b2b-anchor href={testRef}>This is a test anchor.</b2b-anchor>
    ),
  });

  expect(page.root).toEqualHtml(`
    <b2b-anchor>
      <mock:shadow-root>
        <a href="https://www.otto.de" class="b2b-anchor b2b-anchor--inherit b2b-anchor-hover--default b2b-anchor--underline-text" target="_self">
          <slot></slot>
        </a>
      </mock:shadow-root>
      This is a test anchor.
    </b2b-anchor>
  `);
});

it('should change the font size of the anchor component if specified', async () => {
  const page = await newSpecPage({
    components: [AnchorComponent],
    template: () => (
      <b2b-anchor href={testRef} size="100">
        This is a test anchor.
      </b2b-anchor>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-anchor>
      <mock:shadow-root>
        <a href="https://www.otto.de" class="b2b-anchor b2b-anchor--100 b2b-anchor-hover--default b2b-anchor--underline-text" target="_self">
          <slot></slot>
        </a>
      </mock:shadow-root>
      This is a test anchor.
    </b2b-anchor>
  `);
});

it('should change the download string if specified', async () => {
  const page = await newSpecPage({
    components: [AnchorComponent],
    template: () => (
      <b2b-anchor href={testRef} download="This is a test download">
        This is a test anchor.
      </b2b-anchor>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-anchor>
      <mock:shadow-root>
        <a href="https://www.otto.de" class="b2b-anchor b2b-anchor--inherit b2b-anchor-hover--default b2b-anchor--underline-text" target="_self" download="This is a test download">
          <slot></slot>
        </a>
      </mock:shadow-root>
      This is a test anchor.
    </b2b-anchor>
  `);
});

it('should change the target property if specified', async () => {
  const page = await newSpecPage({
    components: [AnchorComponent],
    template: () => (
      <b2b-anchor href={testRef} target="parent">
        This is a test anchor.
      </b2b-anchor>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-anchor>
      <mock:shadow-root>
        <a href="https://www.otto.de" class="b2b-anchor b2b-anchor--inherit b2b-anchor-hover--default b2b-anchor--underline-text" target="_parent">
          <slot></slot>
        </a>
      </mock:shadow-root>
      This is a test anchor.
    </b2b-anchor>
  `);
});
