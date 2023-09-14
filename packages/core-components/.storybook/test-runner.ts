const { toMatchImageSnapshot } = require('jest-image-snapshot');

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const ignoredStories = [
  'components-assets-icon--story-070-all-icons',
  'components-status-feedback-modal--story-010-backdrop-dismiss',
  'components-status-feedback-modal--story-020-esc-dismiss',
  'components-interaction-tooltip--story-010-hover',
  'components-interaction-tooltip--story-020-focus',
  'components-interaction-tooltip--story-030-custom',
  'designtokens-color--story-010-color-tokens',
  'designtokens-font--story-010-font-tokens',
  'designtokens-size--story-010-size-tokens',
];

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
    // retry on failures as this can be caused by delay in loading assets or rendering
    jest.retryTimes(10);
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
    });
  },
};
