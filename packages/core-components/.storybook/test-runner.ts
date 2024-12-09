const { toMatchImageSnapshot } = require('jest-image-snapshot');

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const ignoredStories = [
  'components-assets-icon-100--all-icons',
  'components-assets-icon--story-070-all-icons',
  'components-assets-icon--story-040-size-50',
  'components-status-feedback-modal--story-010-backdrop-dismiss',
  'components-status-feedback-modal--story-020-esc-dismiss',
  'components-interaction-tooltip--story-010-hover',
  'components-interaction-tooltip--story-020-focus',
  'components-interaction-tooltip--story-030-custom',
  'components-interaction-flyout-menu--default',
  'components-interaction-flyout-menu--disabled',
  'components-interaction-flyout-menu--separator',
  'design-tokens-color--story-010-color-tokens',
  'design-tokens-font--story-010-font-tokens',
  'design-tokens-size--story-010-size-tokens',
  'components-form-date-picker--default',
  'components-form-date-picker--disable-future-dates',
  'components-form-date-picker--disable-past-dates',
  'components-form-date-picker--disable-weekends',
  'components-form-date-picker--pre-selected-date',
  'components-form-date-picker--without-hint-message',
];

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
    // retry on failures as this can be caused by delay in loading assets or rendering
    jest.retryTimes(5);
  },
  async postRender(page, context) {
    if (ignoredStories.includes(context.id)) {
      console.log('Skipped: ', context.id);
      return;
    }
    await page.waitForTimeout(1000);

    const image = await page.screenshot({ animations: 'disabled' });
    // @ts-ignore
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      threshold: 0.25,
    });
  },
};
