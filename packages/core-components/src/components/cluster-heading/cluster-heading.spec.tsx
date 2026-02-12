import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { ClusterHeadingComponent } from './cluster-heading';
import { B2bIcon } from '../icon/icon';

describe('b2b-cluster-heading', () => {
  describe('basic rendering', () => {
    it('should render with label', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Test Label"></b2b-cluster-heading>
        ),
      });
      expect(page.root).toMatchSnapshot();
      expect(page.root.shadowRoot.textContent).toContain('Test Label');
    });

    it('should render in non-collapsible mode by default', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Static Heading"></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(header.getAttribute('role')).toBeNull();
      expect(
        header.classList.contains('b2b-cluster-heading__header--collapsible'),
      ).toBe(false);
    });

    it('should render in collapsible mode when enabled', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Collapsible"
            collapsible={true}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(header.getAttribute('role')).toBe('button');
      expect(
        header.classList.contains('b2b-cluster-heading__header--collapsible'),
      ).toBe(true);
    });

    it('should render with open state by default when collapsible', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={true}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(header.getAttribute('aria-expanded')).toBe('true');
    });

    it('should render with closed state when specified', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={true}
            open={false}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(header.getAttribute('aria-expanded')).toBe('false');
    });

    it('should render with error state', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Error" error={true}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(
        header.classList.contains('b2b-cluster-heading__header--error'),
      ).toBe(true);
    });

    it('should render with full width by default', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Test"></b2b-cluster-heading>
        ),
      });
      expect(
        page.root.classList.contains('b2b-cluster-heading--full-width'),
      ).toBe(true);
    });

    it('should render without full width when disabled', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            full-width={false}></b2b-cluster-heading>
        ),
      });
      expect(
        page.root.classList.contains('b2b-cluster-heading--full-width'),
      ).toBe(false);
    });
  });

  describe('icon rendering', () => {
    it('should render icon when collapsible and closed', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={true}
            open={false}></b2b-cluster-heading>
        ),
      });
      const icon = page.root.shadowRoot.querySelector('b2b-icon');
      expect(icon).not.toBeNull();
    });

    it('should render icon when collapsible and open', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={true}
            open={true}></b2b-cluster-heading>
        ),
      });
      const icon = page.root.shadowRoot.querySelector('b2b-icon');
      expect(icon).not.toBeNull();
    });

    it('should not render icon when not collapsible', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={false}></b2b-cluster-heading>
        ),
      });
      const icon = page.root.shadowRoot.querySelector('b2b-icon');
      expect(icon).toBeNull();
    });
  });

  describe('content slot visibility', () => {
    it('should show content when open and collapsible', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Test" collapsible={true} open={true}>
            <div>Content</div>
          </b2b-cluster-heading>
        ),
      });
      const content = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__content',
      );
      expect(content).not.toBeNull();
      expect(
        content.classList.contains('b2b-cluster-heading__content--open'),
      ).toBe(true);
    });

    it('should hide content when closed and collapsible', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Test" collapsible={true} open={false}>
            <div>Content</div>
          </b2b-cluster-heading>
        ),
      });
      const content = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__content',
      );
      expect(content).not.toBeNull();
      expect(
        content.classList.contains('b2b-cluster-heading__content--closed'),
      ).toBe(true);
    });

    it('should render content directly when not collapsible', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading label="Test" collapsible={false}>
            <div>Content</div>
          </b2b-cluster-heading>
        ),
      });
      const slot = page.root.shadowRoot.querySelector('slot');
      expect(slot).not.toBeNull();
      // Content container should not exist for non-collapsible
      const contentContainer = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__content',
      );
      expect(contentContainer).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes for collapsible heading', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={true}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      const content = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__content',
      );

      expect(header.getAttribute('role')).toBe('button');
      expect(header.getAttribute('aria-expanded')).toBeTruthy();
      expect(header.getAttribute('aria-controls')).toBeTruthy();
      expect(content.getAttribute('aria-labelledby')).toBeTruthy();
      expect(content.getAttribute('role')).toBe('region');
    });

    it('should have tabindex for collapsible heading', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={true}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(header.getAttribute('tabindex')).toBe('0');
    });

    it('should not have ARIA attributes for non-collapsible heading', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={false}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );

      expect(header.getAttribute('role')).toBeNull();
      expect(header.getAttribute('aria-expanded')).toBeNull();
      expect(header.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle empty label', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => <b2b-cluster-heading label=""></b2b-cluster-heading>,
      });
      const label = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__label',
      );
      expect(label.textContent).toBe('');
    });

    it('should ignore open prop when not collapsible', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            collapsible={false}
            open={false}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(header.getAttribute('aria-expanded')).toBeNull();
    });

    it('should apply error state independently of collapsible state', async () => {
      const page = await newSpecPage({
        components: [ClusterHeadingComponent, B2bIcon],
        template: () => (
          <b2b-cluster-heading
            label="Test"
            error={true}
            collapsible={false}></b2b-cluster-heading>
        ),
      });
      const header = page.root.shadowRoot.querySelector(
        '.b2b-cluster-heading__header',
      );
      expect(
        header.classList.contains('b2b-cluster-heading__header--error'),
      ).toBe(true);
    });
  });
});
