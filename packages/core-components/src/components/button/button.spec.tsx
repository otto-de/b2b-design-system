import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { ButtonComponent } from './button';

it('should render the button with default values', async () => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    template: () => <b2b-button>B2B Button</b2b-button>,
  });
  expect(page.root).toEqualHtml(`
      <b2b-button class='button-100'>
      <mock:shadow-root>
          <button class='secondary' type='button'>
            <span>
              <slot name="start"></slot>
              <slot></slot>
              <slot name="end"></slot>
            </span>
          </button>
        </mock:shadow-root>
        B2B Button
    	</b2b-button>
		`);
});

it('should disable the button', async () => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    template: () => (
      <b2b-button variant="primary" disabled>
        B2B Button
      </b2b-button>
    ),
  });

  expect(page.root).toEqualHtml(`
    <b2b-button disabled class='button-100'>
      <mock:shadow-root>
        <button class='primary' type='button' disabled>
          <span>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </button>
      </mock:shadow-root>
      B2B Button
    </b2b-button>
  `);
});

it('should show loader indicator', async () => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    template: () => <b2b-button loading={true}>B2B Button</b2b-button>,
  });

  expect(page.root).toEqualHtml(`
    <b2b-button class='button-100 loading'>
      <mock:shadow-root>
        <button class='secondary' type='button'>
          <span>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
          <div class="button-spinner">
            <b2b-spinner color='secondary' size='50'></b2b-spinner>
          </div>
        </button>
      </mock:shadow-root>
      B2B Button
    </b2b-button>
  `);
});

it('should show loader indicator when changing dynamically', async () => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    template: () => <b2b-button loading={false}>B2B Button</b2b-button>,
  });

  expect(page.root).toEqualHtml(`
    <b2b-button class='button-100'>
      <mock:shadow-root>
        <button class='secondary' type='button'>
          <span>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </button>
      </mock:shadow-root>
      B2B Button
    </b2b-button>
  `);

  page.root.loading = true;
  await page.waitForChanges();

  expect(page.root).toEqualHtml(`
    <b2b-button class='button-100 loading'>
      <mock:shadow-root>
        <button class='secondary' type='button'>
          <span>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
          <div class="button-spinner">
            <b2b-spinner color='secondary' size='50'></b2b-spinner>
          </div>
        </button>
      </mock:shadow-root>
      B2B Button
    </b2b-button>
  `);
});

it('should use an anchor if an href is specified', async () => {
  const page = await newSpecPage({
    components: [ButtonComponent],
    template: () => <b2b-button href="otto.de">B2B Button</b2b-button>,
  });

  expect(page.root).toEqualHtml(`
    <b2b-button class='button-100'>
      <mock:shadow-root>
        <a href='otto.de' target='_self' class='secondary'>
          <span>
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
          </span>
        </a>
      </mock:shadow-root>
      B2B Button
    </b2b-button>
  `);
});
