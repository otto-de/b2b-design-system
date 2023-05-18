import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { StepperComponent } from './stepper';

describe('B2B-Stepper', () => {
  async function renderPage(template) {
    return newSpecPage({
      components: [StepperComponent],
      template: () => template,
    });
  }

  it('should render stepper with default attributes', async () => {
    const page = await renderPage(<b2b-stepper></b2b-stepper>);
    expect(page.root).toEqualHtml(`
      <b2b-stepper>
        <mock:shadow-root>
        <div class="b2b_grid">
           <ul class="b2b_wizard">
              <li class="b2b_wizard__step b2b2_my-4 b2b_wizard__step--complete">
                <span>test</span>
              </li>
              <li class="b2b_wizard__step b2b2_my-4 b2b_wizard__step--active">
                <span>test2</span>
              </li>
            </ul>
        </div>
        </mock:shadow-root>
      </b2b-stepper>
		`);
  });
});
