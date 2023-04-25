import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { SpinnerComponent } from './spinner';

describe('B2B-Spinner', () => {
  async function renderPage(template) {
    return newSpecPage({
      components: [SpinnerComponent],
      template: () => template,
    });
  }

  it('should render spinner with default attributes', async () => {
    const page = await renderPage(<b2b-spinner></b2b-spinner>);
    expect(page.root).toEqualHtml(`
      <b2b-spinner>
        <mock:shadow-root>
          <div class="b2b-spinner b2b-spinner--size-100 b2b-spinner--color-primary"></div>
        </mock:shadow-root>
      </b2b-spinner>
		`);
  });

  it('should render spinner with small size', async () => {
    const page = await renderPage(<b2b-spinner size="50"></b2b-spinner>);
    expect(page.root).toEqualHtml(`
      <b2b-spinner>
        <mock:shadow-root>
          <div class="b2b-spinner b2b-spinner--size-50 b2b-spinner--color-primary"></div>
        </mock:shadow-root>
    	</b2b-spinner>
		`);
  });

  it('should render spinner with inverse color', async () => {
    const page = await renderPage(<b2b-spinner color="inverse"></b2b-spinner>);
    expect(page.root).toEqualHtml(`
      <b2b-spinner>
        <mock:shadow-root>
          <div class="b2b-spinner b2b-spinner--size-100 b2b-spinner--color-inverse"></div>
        </mock:shadow-root>
    	</b2b-spinner>
		`);
  });
});
