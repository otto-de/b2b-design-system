import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Card', () => {
  let page;
  it('should render the card component', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    expect(element).not.toBeNull();
  });

  it('should display content', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    const element = await page.find('b2b-card');

    expect(element).toEqualText('Hello World');
  });

  it('should disable the card', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card disabled="true">Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    const style = await element.getComputedStyle();
    expect(style.pointerEvents).toBe('none');
    expect(style.color).toBe('rgb(119, 119, 119)');
  });

  it('should pop up when hovered', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    await element.hover();
    await page.waitForChanges();
    await page.waitForTimeout(400);
    const style = await element.getComputedStyle();
    expect(style.boxShadow).toBe('rgba(0, 0, 0, 0.15) 5px 5px 6px 0px');
  });

  it('should pop up when focused', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    await element.focus();
    await page.waitForChanges();
    await page.waitForTimeout(400);
    const style = await element.getComputedStyle();
    expect(style.boxShadow).toBe('rgba(0, 0, 0, 0.15) 5px 5px 6px 0px');
  });

  it('should not pop up when hovered on disabled card', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card disabled="true">Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    await element.hover();
    await page.waitForChanges();
    const style = await element.getComputedStyle();
    expect(style.boxShadow).toBe('rgba(0, 0, 0, 0.15) 2px 2px 5px 0px');
  });

  it('should emit on click', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    const clickSpy = await page.spyOnEvent('b2b-selected');

    await element.click();

    await page.waitForChanges();
    expect(clickSpy).toHaveReceivedEvent();
  });

  it('should emit on enter press', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card>Hello World</b2b-card>`);
    const clickSpy = await page.spyOnEvent('b2b-selected');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.waitForChanges();
    expect(clickSpy).toHaveReceivedEvent();
  });

  it('should not emit when disabled', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-card disabled>Hello World</b2b-card>`);
    const element = await page.find('b2b-card');
    const clickSpy = await page.spyOnEvent('b2b-selected');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await element.click();

    await page.waitForChanges();
    expect(clickSpy).not.toHaveReceivedEvent();
  });

  // it seems we cannot redirect within the context of stencil's e2e testing library
  it('should redirect when a href is passed', async () => {
    page = await newE2EPage();
    const link = 'https://www.otto.de/';
    await page.setContent(`<b2b-card href="${link}">Hello World</b2b-card>`);

    const element = await page.find('b2b-card >>> a');
    const href = await element.getProperty('href');

    expect(href).toEqualText(link);
  });

  it('should focus on next card when navigating with keyboard and first card has a href value', async () => {
    page = await newE2EPage();
    await page.setContent(`<div>
        <b2b-card id='card1' href="www.something.com"></b2b-card>
        <b2b-card id='card2'>Hello World</b2b-card>
      </div>`);

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    let activeElId = await page.evaluate(() => {
      return document.activeElement.id;
    });

    expect(activeElId).toEqualText('card1');

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    activeElId = await page.evaluate(() => {
      return document.activeElement.id;
    });

    expect(activeElId).toEqualText('card2');
  });
});
