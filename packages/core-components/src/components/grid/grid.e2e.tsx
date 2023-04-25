import { newE2EPage } from '@stencil/core/testing';

describe('B2B Grid', () => {
  it('should render the grid and children', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<b2b-grid>
        <b2b-grid-row>
            <b2b-grid-col></b2b-grid-col>
        </b2b-grid-row>
    </b2b-grid>`,
    );

    const grid = await page.find('b2b-grid');
    expect(grid).not.toBeNull;

    const row = await page.find('b2b-grid >>> b2b-grid-row');
    expect(row).not.toBeNull;

    const col = await page.find('b2b-grid >>> b2b-grid-row >>> b2b-grid-col');
    expect(col).not.toBeNull;
  });
});
