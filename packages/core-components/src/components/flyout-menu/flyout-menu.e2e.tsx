import { newE2EPage } from '@stencil/core/testing';

describe('B2B-FlyoutMenu', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <b2b-flyout-menu>
        <b2b-icon-100 icon="b2b_icon-ellipsis" slot='trigger' clickable focusable></b2b-icon-100>
        <b2b-flyout-menu-option slot='option' option='option1' >
        </b2b-flyout-menu-option>
        <b2b-flyout-menu-option slot='option' option='option2' >
        </b2b-flyout-menu-option>
        <b2b-flyout-menu-option slot='option' option='option3' disabled >
        </b2b-flyout-menu-option>
        <b2b-flyout-menu-option slot='option' option='option4' separator >
        </b2b-flyout-menu-option>
      </b2b-flyout-menu>
    `);
  });

  it('should display the flyout menu component along with the custom icon', async () => {
    const flyoutMenu = await page.find('b2b-flyout-menu');
    const icon = flyoutMenu.icon;

    expect(flyoutMenu).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it('should show the menu when icon is clicked', async () => {
    const iconContainer = await page.find('b2b-icon-100');

    iconContainer.click();
    await page.waitForChanges();

    const flyoutMenuOption = await page.find('b2b-flyout-menu-option');
    expect(await flyoutMenuOption.isVisible()).toBe(true);
  });

  it('should hide the menu when it loses focus', async () => {
    const iconContainer = await page.find('b2b-icon-100');

    iconContainer.click();
    await page.waitForChanges();
    const flyoutMenuOption = await page.find('b2b-flyout-menu-option');
    expect(await flyoutMenuOption.isVisible()).toBe(true);

    await page.keyboard.press('Tab');
    await page.waitForChanges();
    const container = await page.find(
      'b2b-flyout-menu >>> div.b2b-flyout-menu__options__container',
    );
    expect(container).not.toHaveClass(
      'b2b-flyout-menu__options__container--on',
    );
  });

  /** Test is extremely flaky due to unknown global interaction. Test suite runs fine in isolation, so skipping for now. */
  xit('should emit the selected event when a menu option is clicked', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');
    const icon = await page.find('b2b-icon-100 >>> div');

    await icon.click();
    await page.waitForChanges();

    const flyoutMenuOption = await page.find('b2b-flyout-menu-option');
    await flyoutMenuOption.click();
    await page.waitForChanges();

    expect(flyoutMenuOption).not.toBeNull();
    expect(optionSelectedEventSpy).toHaveReceivedEvent();
    expect(optionSelectedEventSpy).toHaveReceivedEventDetail({
      selectedOption: 'option1',
    });
  });

  it('should disable an option when disabled is true', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');
    const icon = await page.find('b2b-icon-100');

    icon.click();
    await page.waitForChanges();

    const flyoutMenuOption = await page.find(
      'b2b-flyout-menu-option[option="option3"]',
    );
    await flyoutMenuOption.click();
    await page.waitForChanges();

    expect(flyoutMenuOption).not.toBeNull();
    expect(optionSelectedEventSpy).not.toHaveReceivedEvent();
  });

  it('should display separator after an option when separator is true', async () => {
    const icon = await page.find('b2b-icon-100');

    icon.click();
    await page.waitForChanges();

    const flyoutMenuOptions = await page.findAll('b2b-flyout-menu-option');
    const flyoutMenuOption4 = flyoutMenuOptions[3];

    const separator = await flyoutMenuOption4.getProperty('separator');
    expect(separator).toBe(true);
  });

  it('should emit the selected event when a menu option is navigated to using a keyboard', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    await page.keyboard.press('Enter');
    await page.waitForChanges();

    const flyoutMenuOption = await page.find('b2b-flyout-menu-option');
    expect(flyoutMenuOption).not.toBeNull();
    expect(await flyoutMenuOption.isVisible()).toBe(true);

    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();

    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(optionSelectedEventSpy).toHaveReceivedEvent();
    expect(optionSelectedEventSpy).toHaveReceivedEventDetail({
      selectedOption: 'option1',
    });
  });
});
