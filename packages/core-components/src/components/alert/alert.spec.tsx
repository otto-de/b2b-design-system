import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { AlertComponent } from './alert';

it('should render the alert with default values', async () => {
  const page = await newSpecPage({
    components: [AlertComponent],
    template: () => <b2b-alert opened></b2b-alert>,
  });
  expect(page.root).toEqualHtml(`
    <b2b-alert>
        <mock:shadow-root>
            <div class="b2b-alert b2b-alert--info b2b-alert--open b2b-alert--small">
                <div class="b2b-alert-content">
                    <span class="b2b-alert--info-icon">
                        <b2b-icon icon="b2b_icon-info"></b2b-icon>
                    </span>
                </div>
            </div>
        </mock:shadow-root>
    </b2b-alert>
    `);
});

it('should render a large alert', async () => {
  const page = await newSpecPage({
    components: [AlertComponent],
    template: () => (
      <b2b-alert opened size="large">
        This is some test text.
      </b2b-alert>
    ),
  });
  expect(page.root).toEqualHtml(`
        <b2b-alert>
            <mock:shadow-root>
                <div class="b2b-alert b2b-alert--info b2b-alert--open b2b-alert--large">
                    <div class="b2b-alert-content">
                        <span class="b2b-alert--info-icon">
                            <b2b-icon icon="b2b_icon-info"></b2b-icon>
                        </span>
                        <p>
                            <slot></slot>
                        </p>
                    </div>
                    <div class="b2b-alert-close-icon">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.886 16l8.057-8.057a1.333 1.333 0 1 0-1.885-1.886l-8.057 8.057-8.057-8.057a1.333 1.333 0 1 0-1.886 1.886L14.115 16l-8.057 8.057a1.332 1.332 0 1 0 1.886 1.885l8.057-8.057 8.057 8.057a1.331 1.331 0 0 0 1.886 0 1.332 1.332 0 0 0 0-1.885L17.887 16z"></path>
                        </svg>
                    </div>
                </div>
            </mock:shadow-root>
            This is some test text.
        </b2b-alert>
    `);
});

it('should render a custom icon', async () => {
  const page = await newSpecPage({
    components: [AlertComponent],
    template: () => (
      <b2b-alert opened custom-icon>
        <b2b-icon icon="b2b_icon-menu"></b2b-icon>
      </b2b-alert>
    ),
  });
  expect(page.root).toEqualHtml(`
        <b2b-alert custom-icon="">
            <mock:shadow-root>
                <div class="b2b-alert b2b-alert--info b2b-alert--open b2b-alert--small">
                    <div class="b2b-alert-content">
                        <span class="b2b-alert--info-icon">
                            <slot></slot>
                        </span>
                    </div>
                </div>
            </mock:shadow-root>
            <b2b-icon icon="b2b_icon-menu"></b2b-icon>
        </b2b-alert>
        `);
});
