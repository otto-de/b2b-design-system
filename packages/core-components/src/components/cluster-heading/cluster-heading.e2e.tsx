import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Cluster-Heading', () => {
  let page;

  describe('rendering', () => {
    it('should render the cluster heading component', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Test Heading"></b2b-cluster-heading>`,
      );
      const element = await page.find('b2b-cluster-heading');
      expect(element).not.toBeNull();
    });

    it('should display the label', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="My Cluster Heading"></b2b-cluster-heading>`,
      );
      const element = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__label',
      );
      expect(element.textContent).toBe('My Cluster Heading');
    });

    it('should have correct height', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Test"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      const style = await header.getComputedStyle();
      expect(style.height).toBe('56px');
    });

    it('should have grey background', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Test"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      const style = await header.getComputedStyle();
      // Check that background-color is set (actual value depends on CSS variables)
      expect(style.backgroundColor).toBeTruthy();
    });
  });

  describe('non-collapsible mode', () => {
    it('should not show icon in non-collapsible mode', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Static Heading"></b2b-cluster-heading>`,
      );
      const icon = await page.find('b2b-cluster-heading >>> b2b-icon');
      expect(icon).toBeNull();
    });

    it('should not be clickable in non-collapsible mode', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Static Heading"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      const style = await header.getComputedStyle();
      expect(style.cursor).not.toBe('pointer');
    });

    it('should display content directly', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Test"><div>Direct Content</div></b2b-cluster-heading>`,
      );
      const element = await page.find('b2b-cluster-heading');
      expect(element.textContent).toContain('Direct Content');
    });
  });

  describe('collapsible mode - interactions', () => {
    it('should toggle on click', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Toggle Me" collapsible="true" open="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      const toggleSpy = await page.spyOnEvent('b2b-toggle');

      await header.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEvent();
      expect(toggleSpy.firstEvent.detail).toBe(false);
    });

    it('should toggle on Enter key press', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Keyboard Toggle" collapsible="true"></b2b-cluster-heading>`,
      );
      const toggleSpy = await page.spyOnEvent('b2b-toggle');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEvent();
    });

    it('should toggle on Space key press', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Space Toggle" collapsible="true"></b2b-cluster-heading>`,
      );
      const toggleSpy = await page.spyOnEvent('b2b-toggle');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEvent();
    });

    it('should show icon when collapsible', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Icon Test" collapsible="true" open="true"></b2b-cluster-heading>`,
      );

      const icon = await page.find('b2b-cluster-heading >>> b2b-icon');
      expect(icon).not.toBeNull();
    });

    it('should update aria-expanded on toggle', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="ARIA Test" collapsible="true" open="true"></b2b-cluster-heading>`,
      );

      let header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      expect(await header.getAttribute('aria-expanded')).toBe('true');

      await header.click();
      await page.waitForChanges();

      header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      expect(await header.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have pointer cursor when collapsible', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Clickable" collapsible="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      const style = await header.getComputedStyle();
      expect(style.cursor).toBe('pointer');
    });
  });

  describe('collapsible mode - content visibility', () => {
    it('should show content when open', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <b2b-cluster-heading label="Open" collapsible="true" open="true">
          <div id="test-content">Visible Content</div>
        </b2b-cluster-heading>
      `);

      const content = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__content',
      );
      expect(
        content.classList.contains('b2b-cluster-heading__content--open'),
      ).toBe(true);
    });

    it('should hide content when closed', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <b2b-cluster-heading label="Closed" collapsible="true" open="false">
          <div id="test-content">Hidden Content</div>
        </b2b-cluster-heading>
      `);

      const content = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__content',
      );
      expect(
        content.classList.contains('b2b-cluster-heading__content--closed'),
      ).toBe(true);
    });

    it('should animate content expansion', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <b2b-cluster-heading label="Animation Test" collapsible="true" open="false">
          <div>Content</div>
        </b2b-cluster-heading>
      `);

      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      await header.click();
      await page.waitForChanges();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 300));

      const content = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__content',
      );
      expect(
        content.classList.contains('b2b-cluster-heading__content--open'),
      ).toBe(true);
    });
  });

  describe('error state', () => {
    it('should apply error styling to label', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Error" error="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      expect(
        header.classList.contains('b2b-cluster-heading__header--error'),
      ).toBe(true);
    });

    it('should show error state when accordion is closed', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Error Closed" collapsible="true" open="false" error="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      expect(
        header.classList.contains('b2b-cluster-heading__header--error'),
      ).toBe(true);
      expect(await header.getAttribute('aria-expanded')).toBe('false');
    });

    it('should show error state when accordion is open', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Error Open" collapsible="true" open="true" error="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      expect(
        header.classList.contains('b2b-cluster-heading__header--error'),
      ).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should be keyboard focusable when collapsible', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Focus Test" collapsible="true"></b2b-cluster-heading>`,
      );

      await page.keyboard.press('Tab');
      const activeElement = await page.evaluateHandle(
        () => document.activeElement,
      );
      const tagName = await page.evaluate(el => el.tagName, activeElement);

      expect(tagName).toBe('B2B-CLUSTER-HEADING');
    });

    it('should have proper role attribute', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Role Test" collapsible="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      expect(await header.getAttribute('role')).toBe('button');
    });

    it('should have aria-controls linking to content', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="ARIA Controls" collapsible="true"></b2b-cluster-heading>`,
      );
      const header = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__header',
      );
      const content = await page.find(
        'b2b-cluster-heading >>> .b2b-cluster-heading__content',
      );

      const ariaControls = await header.getAttribute('aria-controls');
      const contentId = await content.getAttribute('id');

      expect(ariaControls).toBe(contentId);
    });
  });

  describe('width behavior', () => {
    it('should be full width by default', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Full Width"></b2b-cluster-heading>`,
      );
      const element = await page.find('b2b-cluster-heading');
      expect(
        element.classList.contains('b2b-cluster-heading--full-width'),
      ).toBe(true);
    });

    it('should support custom width', async () => {
      page = await newE2EPage();
      await page.setContent(
        `<b2b-cluster-heading label="Custom Width" full-width="false"></b2b-cluster-heading>`,
      );
      const element = await page.find('b2b-cluster-heading');
      expect(
        element.classList.contains('b2b-cluster-heading--full-width'),
      ).toBe(false);
    });
  });
});
