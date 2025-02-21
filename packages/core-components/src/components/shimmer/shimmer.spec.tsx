import { newSpecPage } from '@stencil/core/testing';
import { ShimmerComponent } from './shimmer';
import { h } from '@stencil/core';

describe('B2B-Shimmer', () => {
  async function renderPage(template) {
    return newSpecPage({
      components: [ShimmerComponent],
      template: () => template,
    });
  }

  it('should render shimmer effect with width 100 and height 100 attributes', async () => {
    const dummyContent = 'Dummy content';
    const page = await renderPage(
      <b2b-shimmer loading={true} width={100} height={100}>
        {dummyContent}
      </b2b-shimmer>,
    );
    expect(page.root).toEqualHtml(`
      <b2b-shimmer>
        <mock:shadow-root>
          <div class="b2b-shimmer" style="width: 100px; height: 100px;"></div>
        </mock:shadow-root>
        ${dummyContent}
      </b2b-shimmer>
		`);
  });

  it('should show slot content and hide shimmer effect', async () => {
    const dummyContent = 'Dummy content';
    const page = await renderPage(
      <b2b-shimmer loading={false} width={100} height={100}>
        {dummyContent}
      </b2b-shimmer>,
    );
    expect(page.root).toEqualHtml(`
      <b2b-shimmer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        ${dummyContent}
      </b2b-shimmer>
		`);
  });
});
