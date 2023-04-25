import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { B2BInputGroup } from './input-group';
import { InputComponent } from '../input/input';
import { ButtonComponent } from '../button/button';
import { DropdownComponent } from '../dropdown/dropdown';

describe('B2B Input Group', () => {
  it('should render content wrapped in the input group', async () => {
    const page = await newSpecPage({
      components: [
        B2BInputGroup,
        InputComponent,
        ButtonComponent,
        DropdownComponent,
      ],
      template: () => (
        <b2b-input-group>
          <b2b-input label="Search Term"></b2b-input>
          <b2b-dropdown>
            <option value="data-1">Data Set 1</option>
            <option value="data-2">Data Set 2</option>
          </b2b-dropdown>
          <b2b-button variant="primary">Search</b2b-button>
        </b2b-input-group>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render a group hint if it is specified', async () => {
    const page = await newSpecPage({
      components: [
        B2BInputGroup,
        InputComponent,
        ButtonComponent,
        DropdownComponent,
      ],
      template: () => (
        <b2b-input-group hint="A group hint">
          <b2b-input label="Search Term"></b2b-input>
          <b2b-dropdown>
            <option value="data-1">Data Set 1</option>
            <option value="data-2">Data Set 2</option>
          </b2b-dropdown>
          <b2b-button variant="primary">Search</b2b-button>
        </b2b-input-group>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render a group error if one is specified and the group is invalid', async () => {
    const page = await newSpecPage({
      components: [
        B2BInputGroup,
        InputComponent,
        ButtonComponent,
        DropdownComponent,
      ],
      template: () => (
        <b2b-input-group error="A group error" invalid>
          <b2b-input label="Search Term"></b2b-input>
          <b2b-dropdown>
            <option value="data-1">Data Set 1</option>
            <option value="data-2">Data Set 2</option>
          </b2b-dropdown>
          <b2b-button variant="primary">Search</b2b-button>
        </b2b-input-group>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should not render a group error if the group is invalid and disabled', async () => {
    const page = await newSpecPage({
      components: [
        B2BInputGroup,
        InputComponent,
        ButtonComponent,
        DropdownComponent,
      ],
      template: () => (
        <b2b-input-group
          invalid
          disabled
          hint="A group hint"
          error="A group error">
          <b2b-input label="Search Term"></b2b-input>
          <b2b-dropdown>
            <option value="data-1">Data Set 1</option>
            <option value="data-2">Data Set 2</option>
          </b2b-dropdown>
          <b2b-button variant="primary">Search</b2b-button>
        </b2b-input-group>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
