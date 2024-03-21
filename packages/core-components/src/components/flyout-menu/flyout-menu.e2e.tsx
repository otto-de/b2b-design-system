import { newE2EPage } from '@stencil/core/testing';

describe('B2B-FlyoutMenu', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    page = await newE2EPage();
    await page.setContent(`
      <b2b-flyout-menu>
        <b2b-icon icon="b2b_icon-ellipsis" slot='icon'></b2b-icon>
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
    const icon = flyoutMenu.shadowRoot?.icon;

    expect(flyoutMenu).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it('should show the menu when icon is clicked', async () => {
    const iconContainer = await page.find(
      'b2b-flyout-menu >>> .b2b-flyout-menu__icon',
    );

    iconContainer.click();
    await page.waitForChanges();

    const flyoutMenuOption = await page.find('b2b-flyout-menu-option');
    expect(flyoutMenuOption).not.toBeNull();
  });

  it('should emit the selected event when a menu option is clicked', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');
    const iconContainer = await page.find(
      'b2b-flyout-menu >>> .b2b-flyout-menu__icon',
    );

    iconContainer.click();
    await page.waitForChanges();

    const flyoutMenuOption = await page.find('b2b-flyout-menu-option');
    flyoutMenuOption.click();
    await page.waitForChanges();

    expect(flyoutMenuOption).not.toBeNull();
    expect(optionSelectedEventSpy).toHaveReceivedEvent();
    expect(optionSelectedEventSpy).toHaveReceivedEventDetail({
      selectedOption: 'option1',
    });
  });

  it('should disable an option when disabled is true', async () => {
    const optionSelectedEventSpy = await page.spyOnEvent('b2b-option-selected');
    const iconContainer = await page.find(
      'b2b-flyout-menu >>> .b2b-flyout-menu__icon',
    );

    iconContainer.click();
    await page.waitForChanges();

    const flyoutMenuOption = await page.find({ text: 'option3' });
    flyoutMenuOption.click();
    await page.waitForChanges();

    expect(flyoutMenuOption).not.toBeNull();
    expect(optionSelectedEventSpy).not.toHaveReceivedEvent();
  });

  it('should display separator after an option when separator is true', async () => {
    const iconContainer = await page.find(
      'b2b-flyout-menu >>> .b2b-flyout-menu__icon',
    );

    iconContainer.click();
    await page.waitForChanges();

    const flyoutMenuOptions = await page.findAll('b2b-flyout-menu-option');
    const flyoutMenuOption4 = flyoutMenuOptions[3];

    const separator = await flyoutMenuOption4.getProperty('separator');
    expect(separator).toBe(true);
  });
});
