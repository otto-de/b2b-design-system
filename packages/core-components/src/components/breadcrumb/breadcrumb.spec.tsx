import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { BreadCrumbComponent } from './breadcrumb';
import { BreadCrumbItemComponent } from './breadcrumb-item';

const testRef = 'https://www.otto.de';

it('should render the breadcrumb component with default values', async () => {
  const page = await newSpecPage({
    components: [BreadCrumbComponent, BreadCrumbItemComponent],
    template: () => (
      <b2b-breadcrumb>
        <b2b-breadcrumb-item href="https://www.otto.de">
          First
        </b2b-breadcrumb-item>
        <b2b-breadcrumb-item>Second</b2b-breadcrumb-item>
      </b2b-breadcrumb>
    ),
  });

  expect(page.root).toEqualHtml(`
    <b2b-breadcrumb>
       <mock:shadow-root>
         <div class="obc_breadcrumb-nav">
           <slot></slot>
         </div>
       </mock:shadow-root>
    <b2b-breadcrumb-item>
         <mock:shadow-root>
           <span class="obc_breadcrumb-nav__item">
             <a href="https://www.otto.de">
               <slot></slot>
             </a>
             <div class="obc_breadcrumb-nav__item-after">
               »
             </div>
           </span>
         </mock:shadow-root>
         First
       </b2b-breadcrumb-item>
       <b2b-breadcrumb-item>
         <mock:shadow-root>
           <span class="obc_breadcrumb-nav__item">
             <slot></slot>
           </span>
         </mock:shadow-root>
         Second
       </b2b-breadcrumb-item>
    </b2b-breadcrumb>
  `);
});
