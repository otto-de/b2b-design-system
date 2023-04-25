import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { ParagraphComponent } from './paragraph';

it('should render paragraph with default attributes', async () => {
  const page = await newSpecPage({
    components: [ParagraphComponent],
    template: () => <b2b-paragraph>Paragraph</b2b-paragraph>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-paragraph>
      <mock:shadow-root>
        <p class="b2b-paragraph size-100 weight-normal align-left">
          <slot></slot>
        </p>
      </mock:shadow-root>  
      Paragraph
    </b2b-paragraph>
  `);
});

it('should render bold paragraph', async () => {
  const page = await newSpecPage({
    components: [ParagraphComponent],
    template: () => <b2b-paragraph weight="bold">Paragraph</b2b-paragraph>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-paragraph>
      <mock:shadow-root>
        <p class="b2b-paragraph size-100 weight-bold align-left">
          <slot></slot>
        </p>
      </mock:shadow-root>  
      Paragraph
    </b2b-paragraph>
  `);
});

it('should render small paragraph', async () => {
  const page = await newSpecPage({
    components: [ParagraphComponent],
    template: () => <b2b-paragraph size="50">Paragraph</b2b-paragraph>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-paragraph>
      <mock:shadow-root>
        <p class="b2b-paragraph size-50 weight-normal align-left">
          <slot></slot>
        </p>
      </mock:shadow-root>  
      Paragraph
    </b2b-paragraph>
  `);
});

it('should render center aligned paragraph', async () => {
  const page = await newSpecPage({
    components: [ParagraphComponent],
    template: () => <b2b-paragraph align="center">Paragraph</b2b-paragraph>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-paragraph>
      <mock:shadow-root>
        <p class="b2b-paragraph size-100 weight-normal align-center">
          <slot></slot>
        </p>
      </mock:shadow-root>  
      Paragraph
    </b2b-paragraph>
  `);
});
