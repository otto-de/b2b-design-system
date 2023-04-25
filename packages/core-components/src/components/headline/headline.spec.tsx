import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { HeadlineComponent } from './headline';

it('should use h1 tag with headline 400 size', async () => {
  const page = await newSpecPage({
    components: [HeadlineComponent],
    template: () => (
      <b2b-headline size="400">This is a h1 Headline</b2b-headline>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-headline>
      <mock:shadow-root>
        <h1 class="b2b-headline--400 b2b-headline--left">
          <slot></slot>
        </h1>
      </mock:shadow-root>
      This is a h1 Headline
    </b2b-headline>
  `);
});

it('should use h2 tag with headline 200 size', async () => {
  const page = await newSpecPage({
    components: [HeadlineComponent],
    template: () => (
      <b2b-headline size="200">This is a h2 Headline</b2b-headline>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-headline>
      <mock:shadow-root>
        <h2 class="b2b-headline--200 b2b-headline--left">
          <slot></slot>
        </h2>
      </mock:shadow-root>
      This is a h2 Headline
    </b2b-headline>
  `);
});

it('should use h3 tag with headline 100 size', async () => {
  const page = await newSpecPage({
    components: [HeadlineComponent],
    template: () => (
      <b2b-headline size="100">This is a h3 Headline</b2b-headline>
    ),
  });
  expect(page.root).toEqualHtml(`
    <b2b-headline>
      <mock:shadow-root>
        <h3 class="b2b-headline--100 b2b-headline--left">
          <slot></slot>
        </h3>
      </mock:shadow-root>
      This is a h3 Headline
    </b2b-headline>
  `);
});

it('should use h1 tag as default size', async () => {
  const page = await newSpecPage({
    components: [HeadlineComponent],
    template: () => <b2b-headline>This is a h3 Headline</b2b-headline>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-headline>
      <mock:shadow-root>
        <h1 class="b2b-headline--400 b2b-headline--left">
          <slot></slot>
        </h1>
      </mock:shadow-root>
      This is a h3 Headline
    </b2b-headline>
  `);
});
