import { Meta, StoryFn } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: StoryFn = ({ useRouter }) => {
  return html` <b2b-tab-group use-router="${useRouter}">
    <b2b-tab slot="tab">First Tab</b2b-tab>
    <b2b-tab-panel slot="panel"
      ><div>
        <b2b-paragraph
          >Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
        </b2b-paragraph>
      </div></b2b-tab-panel
    >
    <b2b-tab slot="tab">Second Tab</b2b-tab>
    <b2b-tab-panel slot="panel"><div>Selected Panel here</div></b2b-tab-panel>
    <b2b-tab disabled slot="tab">Disabled Tab</b2b-tab>
    <b2b-tab-panel slot="panel"><div>Disabled Panel</div></b2b-tab-panel>
    <b2b-tab invalid slot="tab">Error Tab</b2b-tab>
    <b2b-tab-panel slot="panel"
      ><div>
        <b2b-input-group error="group error" invalid hint="A group hint">
          <b2b-input slot="start" label="Search Term"></b2b-input>
          <b2b-dropdown label="Data Set" invalid error="an error">
            <option value="one">Some longer text</option>
            <option value="one">$</option>
          </b2b-dropdown>
          <b2b-input label="Another input" invalid error="an error"></b2b-input>
          <b2b-dropdown>
            <option value="one">€</option>
            <option value="one">$</option>
          </b2b-dropdown>
          <b2b-button slot="end" variant="primary"
            ><b2b-icon-100 icon="b2b_icon-search"></b2b-icon-100
          ></b2b-button>
        </b2b-input-group></div
    ></b2b-tab-panel>
  </b2b-tab-group>`;
};

const defaultArgs = {
  useRouter: false,
};

export const story010AllTabs = Template.bind({});
story010AllTabs.args = { ...defaultArgs };
story010AllTabs.storyName = 'Default Tab Group';

const tabGroupArgs = getArgTypes('b2b-tab-group');

export default {
  title: 'Components/Interaction/Tab Group',
  argTypes: tabGroupArgs,
  viewMode: 'docs',
} as Meta;
