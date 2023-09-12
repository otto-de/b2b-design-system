import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { BreadCrumbComponent } from './breadcrumb';
import { BreadCrumbItemComponent } from './breadcrumb-item';

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

  expect(page.root).toMatchSnapshot();
});
