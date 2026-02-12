import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const template: StoryFn = ({
  label,
  collapsible,
  open,
  error,
  fullWidth,
  content,
}) => {
  return html`<b2b-cluster-heading
    label=${label}
    collapsible=${collapsible}
    open=${open}
    error=${error}
    full-width=${fullWidth}>
    ${content}
  </b2b-cluster-heading>`;
};

const defaultArgs = {
  label: 'Cluster Heading',
  collapsible: false,
  open: true,
  error: false,
  fullWidth: true,
  content: '',
};

export const story010Default = template.bind({});
story010Default.args = defaultArgs;
story010Default.storyName = 'Default (Non-collapsible)';

export const story020Collapsible = template.bind({});
story020Collapsible.args = {
  ...defaultArgs,
  label: 'Collapsible Heading',
  collapsible: true,
  content: html`<div style="padding: 16px;">
    <p>This is the content that can be collapsed and expanded.</p>
    <p>It supports any HTML content inside.</p>
  </div>`,
};
story020Collapsible.storyName = 'Collapsible (Open by default)';

export const story030CollapsibleClosed = template.bind({});
story030CollapsibleClosed.args = {
  ...defaultArgs,
  label: 'Collapsible Heading (Closed)',
  collapsible: true,
  open: false,
  content: html`<div style="padding: 16px;">
    <p>This content is hidden by default.</p>
  </div>`,
};
story030CollapsibleClosed.storyName = 'Collapsible (Closed by default)';

export const story040ErrorState = template.bind({});
story040ErrorState.args = {
  ...defaultArgs,
  label: 'Error State',
  collapsible: true,
  open: false,
  error: true,
  content: html`<div style="padding: 16px;">
    <p>Content with validation errors.</p>
  </div>`,
};
story040ErrorState.storyName = 'Error State (Closed)';

export const story050ErrorStateOpen = template.bind({});
story050ErrorStateOpen.args = {
  ...defaultArgs,
  label: 'Error State (Open)',
  collapsible: true,
  open: true,
  error: true,
  content: html`<div style="padding: 16px;">
    <p>Content with validation errors visible.</p>
  </div>`,
};
story050ErrorStateOpen.storyName = 'Error State (Open)';

export const story060CustomWidth = template.bind({});
story060CustomWidth.args = {
  ...defaultArgs,
  label: 'Custom Width Heading',
  fullWidth: false,
  content: '',
};
story060CustomWidth.storyName = 'Custom Width (Not Full Width)';

export const story070WithRichContent = template.bind({});
story070WithRichContent.args = {
  ...defaultArgs,
  label: 'Section with Rich Content',
  collapsible: true,
  content: html`<div style="padding: 16px;">
    <h4>Subsection Title</h4>
    <p>
      This is a paragraph with <strong>bold</strong> and <em>italic</em> text.
    </p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
    <button>Action Button</button>
  </div>`,
};
story070WithRichContent.storyName = 'With Rich Content';

const argTypes = getArgTypes('b2b-cluster-heading');

export default {
  title: 'Components/Utilities/Cluster Heading',
  argTypes: argTypes,
  viewMode: 'docs',
} as Meta;
