import { newE2EPage } from '@stencil/core/testing';

describe('B2B Tab Group', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
        <b2b-tab-group>
        <b2b-tab slot="tab">
          First Tab
        </b2b-tab>
        <b2b-tab-panel slot="panel">
          First Panel
        </b2b-tab-panel>
        <b2b-tab slot="tab">
          Second Tab
        </b2b-tab>
        <b2b-tab-panel slot="panel">
          Second Panel
        </b2b-tab-panel>
        <b2b-tab slot="tab" disabled="true">
        Disabled Tab
      </b2b-tab>
      <b2b-tab-panel slot="panel">
        Disabled Panel
      </b2b-tab-panel>
      </b2b-tab-group>
        `);
  });

  it('should render the tab group', async () => {
    const element = await page.find('b2b-tab-group');
    expect(element).not.toBeNull();
  });

  it('should select the first tab by default', async () => {
    const tab = await page.find('b2b-tab');
    const selected = await tab.getProperty('selected');
    expect(selected).toBe(true);
  });

  it('should show the panel associated with the tab that is selected', async () => {
    const tab = await page.find({ text: 'First Tab' });
    const selected = await tab.getProperty('selected');
    expect(selected).toBe(true);
    const panel = await page.find({ text: 'First Panel' });

    expect(await panel.isVisible()).toBe(true);
  });

  it('should not select a disabled tab', async () => {
    const tab = await page.find({ text: 'Disabled Tab' });
    const panel = await page.find({ text: 'Disabled Panel' });
    const selected = await tab.getProperty('selected');
    expect(selected).toBe(false);

    await tab.click();

    await page.waitForChanges();
    const selectedAfter = await tab.getProperty('selected');
    expect(selectedAfter).toBe(false);
    expect(await panel.isVisible()).toBe(false);
  });

  it('should navigate to the next enabled tab using the keyboard', async () => {
    const tabs = await page.findAll('b2b-tab');
    expect(await tabs[0].getProperty('selected')).toBe(true);

    await page.keyboard.down('ArrowRight');
    await page.waitForChanges();

    expect(await tabs[1].getProperty('selected')).toBe(true);

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    expect(await tabs[2].getProperty('selected')).toBe(false);
    expect(await tabs[0].getProperty('selected')).toBe(true);
  });

  it('should navigate to the previous tab using the keyboard', async () => {
    const tabs = await page.findAll('b2b-tab');
    expect(await tabs[0].getProperty('selected')).toBe(true);

    await page.keyboard.down('ArrowLeft');
    await page.waitForChanges();

    // second tab is selected because it is first enabled from last
    expect(await tabs[1].getProperty('selected')).toBe(true);

    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();

    // first tab is selected because last tab is disabled
    expect(await tabs[0].getProperty('selected')).toBe(true);
  });

  it('should emit when a new tab is selected', async () => {
    const changeSpy = await page.spyOnEvent('b2b-selected');
    const secondTab = await page.find({ text: 'Second Tab' });

    await secondTab.click();

    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
  });

  it('should not navigate when external navigation is used', async () => {
    const tabGroup = await page.find('b2b-tab-group');
    await tabGroup.setProperty('useRouter', true);

    await page.waitForChanges();

    const tabs = await page.findAll('b2b-tab');
    expect(await tabs[0].getProperty('selected')).toBe(true);
    expect(await tabs[0].getAttribute('aria-controls')).not.toBeDefined;

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    await tabs[1].click();
    await page.waitForChanges();

    expect(await tabs[1].getProperty('selected')).toBe(false);
  });
});
