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
  'components-status-feedback-shimmer--story-010-default',
];

module.exports = {
  async setup() {
    expect.extend({ toMatchImageSnapshot });
    jest.retryTimes(5);
  },
  async postVisit(page: any, context: any) {
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
