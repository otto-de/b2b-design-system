## [1.37.4](https://github.com/otto-de/b2b-design-system/compare/v1.37.3...v1.37.4) (2026-01-06)


### Bug Fixes

* **deployment:** [BLA-1950] Add back registry url and scope ([73411a2](https://github.com/otto-de/b2b-design-system/commit/73411a2ccd3247f11e3ce08e5eb3fb7f7456d764))

## [1.37.2](https://github.com/otto-de/b2b-design-system/compare/v1.37.1...v1.37.2) (2025-12-04)


### Bug Fixes

* **timePicker:** [NEPTUNE-5057] Show Hint span only when hint is defined or error is present ([#656](https://github.com/otto-de/b2b-design-system/issues/656)) ([f7f34ff](https://github.com/otto-de/b2b-design-system/commit/f7f34ff32acabdd9518c744b0e8a1ba99231b735))

## [1.37.1](https://github.com/otto-de/b2b-design-system/compare/v1.37.0...v1.37.1) (2025-11-28)


### Bug Fixes

* **Security:** [BLA-1881] Disabling dependabot to prevent auto update of dependencies to avoid installing Sha1-Hulud 2.0 malware ([#646](https://github.com/otto-de/b2b-design-system/issues/646)) ([5a20d66](https://github.com/otto-de/b2b-design-system/commit/5a20d66afe890c338243a566c42bad4fcec1ff44))
* **Security:** [BLA-1881] update versions of packages affected by Sha1-Hulud 2.0 ([161aedb](https://github.com/otto-de/b2b-design-system/commit/161aedb0a624f8241cd1e7d7ef9badca7c230874))

# [1.37.0](https://github.com/otto-de/b2b-design-system/compare/v1.36.0...v1.37.0) (2025-11-25)


### Features

* **dropdown:** [NEPTUNE-4552] Add customisible clear button ([#641](https://github.com/otto-de/b2b-design-system/issues/641)) ([0b7439b](https://github.com/otto-de/b2b-design-system/commit/0b7439b7956a6e01abf6590798767baf2a422942))

# [1.36.0](https://github.com/otto-de/b2b-design-system/compare/v1.35.0...v1.36.0) (2025-11-11)


### Features

* **dropdown:** [NEPTUNE-4925] fix css for clear icon ([#637](https://github.com/otto-de/b2b-design-system/issues/637)) ([196ae23](https://github.com/otto-de/b2b-design-system/commit/196ae236c39de1e3311bed528448b596f3fa1ae9))
* **InputList:** [BLA-1794] Add partial search functionality for input list ([#636](https://github.com/otto-de/b2b-design-system/issues/636)) ([8111568](https://github.com/otto-de/b2b-design-system/commit/8111568a4bf4f03e522861831ceb95d0edcf6694))

# [1.35.0](https://github.com/otto-de/b2b-design-system/compare/v1.34.0...v1.35.0) (2025-10-27)


### Bug Fixes

* **custom-dropdown:** [BLA-1712] Add alignment options ([#633](https://github.com/otto-de/b2b-design-system/issues/633)) ([6fd4712](https://github.com/otto-de/b2b-design-system/commit/6fd47129f4278e61d12e87d8fb3c32a1e360fc89))
* **dropdown:** [BLA-1772] Sync DOM state with dropdown selection to prevent reset and update example ([022c31f](https://github.com/otto-de/b2b-design-system/commit/022c31f01d4ea01fb12080a3937deb350dfd63c7))


### Features

* **core:** [NEPTUNE-4945] Implementation of a Timepicker Component in DESY ([8f06a1a](https://github.com/otto-de/b2b-design-system/commit/8f06a1a2a88ead7444aa370bde7b8e493d298bd5))

# [1.34.0](https://github.com/otto-de/b2b-design-system/compare/v1.33.0...v1.34.0) (2025-10-13)


### Bug Fixes

* **dropdown:** fix flicker on load ([#624](https://github.com/otto-de/b2b-design-system/issues/624)) ([dca65e7](https://github.com/otto-de/b2b-design-system/commit/dca65e793ab9cccc6679dc0df190ca3f381c8c75))
* **dropdown:** mutation observer ignores changes to attributes ([#629](https://github.com/otto-de/b2b-design-system/issues/629)) ([a3389a9](https://github.com/otto-de/b2b-design-system/commit/a3389a98ed130e49600541924df50e60a0f80d8d))
* **icon100|local-build-script:** [BLA-1683] | Fix UI crash in storybook and local build script logic ([92a3675](https://github.com/otto-de/b2b-design-system/commit/92a3675e8bfcc95609008f65de292188cf5ae202))
* **toggle-switch:** [CCOP-155] checkmark peak through ([#619](https://github.com/otto-de/b2b-design-system/issues/619)) ([c415dc1](https://github.com/otto-de/b2b-design-system/commit/c415dc13c8a1df5a808a9abca365011d421f1deb))


### Features

* **date-range-picker:** [CCOP-140] Add date-range-picker ([#609](https://github.com/otto-de/b2b-design-system/issues/609)) ([b2f7f82](https://github.com/otto-de/b2b-design-system/commit/b2f7f827a13f4036850b5b4c446c9f72cf0b7a72))

# [1.33.0](https://github.com/otto-de/b2b-design-system/compare/v1.32.3...v1.33.0) (2025-10-06)


### Bug Fixes

* **date-picker:** [CCOP-140] nested interactivity ([d4b2e2c](https://github.com/otto-de/b2b-design-system/commit/d4b2e2c048c5efa268bb75ed81cae2f18413f5c2))
* **date-picker:** broken layout/overlays ([#612](https://github.com/otto-de/b2b-design-system/issues/612)) ([2402c23](https://github.com/otto-de/b2b-design-system/commit/2402c2323e3dbc9e33859be110693601b13bb586))
* **image:** broken nullish check ([141107f](https://github.com/otto-de/b2b-design-system/commit/141107fcbd81b4d2236fc7228feadb1022740e47))
* **input-group:** [CCOP-136] improper disable propagation ([368c85c](https://github.com/otto-de/b2b-design-system/commit/368c85cbcd3bfff1b6da39ed5caa9639fa728c40))
* **input:** fix broken nullish check ([#605](https://github.com/otto-de/b2b-design-system/issues/605)) ([4729e34](https://github.com/otto-de/b2b-design-system/commit/4729e3460aad1f42de81fba128243f72fc22fdf2))
* **multiselect-dropdown:** [CCOP-137] handle groupDisabled ([37206b2](https://github.com/otto-de/b2b-design-system/commit/37206b299c4c32deb687089a5cf4905f64a32a16))


### Features

* **ci:** validate no uncommited changes ([#610](https://github.com/otto-de/b2b-design-system/issues/610)) ([ee5cec6](https://github.com/otto-de/b2b-design-system/commit/ee5cec63bf20a480539e500cda4a8eb3bf23012e))
* **dropdown:** highlight currently selected ([706fc51](https://github.com/otto-de/b2b-design-system/commit/706fc51bc1d410c993f1f6fd1c7a386643450480))
* **icon50|icon100:** [BLA-1706] Add new icons and local build script ([edb552d](https://github.com/otto-de/b2b-design-system/commit/edb552d087d45a47867017d5700cf5ddd0d60791))

## [1.32.3](https://github.com/otto-de/b2b-design-system/compare/v1.32.2...v1.32.3) (2025-09-11)


### Bug Fixes

* **Custom Dropdown:** [NEPTUNE-4374] add text for empty search results ([#606](https://github.com/otto-de/b2b-design-system/issues/606)) ([7a68416](https://github.com/otto-de/b2b-design-system/commit/7a68416050d696265a33a78805872143aa3b2649))

## [1.32.2](https://github.com/otto-de/b2b-design-system/compare/v1.32.1...v1.32.2) (2025-09-11)


### Bug Fixes

* **Custom Dropdown:** [NEPTUNE-4374] fix custom dropdown positioning ([07db8af](https://github.com/otto-de/b2b-design-system/commit/07db8afa3981e43f4e7e778c38a233a71890a595))
* **Custom Dropdown:** [NEPTUNE-NEPTUNE-4374] fix custom dropdown positioning ([01a4c0a](https://github.com/otto-de/b2b-design-system/commit/01a4c0acab77983a1bbf840ad0cea93ed866728f))

## [1.32.1](https://github.com/otto-de/b2b-design-system/compare/v1.32.0...v1.32.1) (2025-08-28)


### Bug Fixes

* **MultiselectDropdown:** [BLA-1602] Fix the svelte multi select loading issue ([#601](https://github.com/otto-de/b2b-design-system/issues/601)) ([14c7801](https://github.com/otto-de/b2b-design-system/commit/14c7801eaf6f1360bcf3ba33e307a5998b212bbd))

# [1.32.0](https://github.com/otto-de/b2b-design-system/compare/v1.31.4...v1.32.0) (2025-08-21)


### Features

* **Custom-dropdown:** [NEPTUNE-4831] fix padding left for selected option ([#598](https://github.com/otto-de/b2b-design-system/issues/598)) ([28519c1](https://github.com/otto-de/b2b-design-system/commit/28519c1dd919aed49e8526a37e39ee1e12940399))
* **Custom-dropdown:** [NEPTUNE-4831] fix snapshots ([#599](https://github.com/otto-de/b2b-design-system/issues/599)) ([43bfbeb](https://github.com/otto-de/b2b-design-system/commit/43bfbeb637dd08463bae26cc5de54c48bbe73f79))

## [1.31.4](https://github.com/otto-de/b2b-design-system/compare/v1.31.3...v1.31.4) (2025-08-13)


### Bug Fixes

* **input-group:** [BLA-1581] Update logic to resize dropdown ([63637cf](https://github.com/otto-de/b2b-design-system/commit/63637cf57dc44664a1fe368415bc99dce9624ca6))

## [1.31.3](https://github.com/otto-de/b2b-design-system/compare/v1.31.2...v1.31.3) (2025-07-30)


### Bug Fixes

* **multiselect-dropdown | input|flyout-menu | datepicker | docs | tokens:** [BLA-1513] Adding several fixes and documentation updates ([d648c1d](https://github.com/otto-de/b2b-design-system/commit/d648c1da99b0dd64b815ec371bcf694906ab0949))
* **radio-group:** [BLA-1538] Add @fullhuman/postcss-purgecss to resolve regression ([82eb296](https://github.com/otto-de/b2b-design-system/commit/82eb29600edde0915793661e6bbe9e3684c66814))
* **radio-group:** [BLA-1538] Add dependency to fix visual test failure ([b8028bb](https://github.com/otto-de/b2b-design-system/commit/b8028bb3892c442bc803d53b6c833171f7ae081b))
* **radio-group:** [BLA-1538] Allow disabling individual radio button inside radio group ([5dd7d05](https://github.com/otto-de/b2b-design-system/commit/5dd7d0527e9266991d555666dfd308dd8a721293))
* **radio-group:** [BLA-1538] Allow disabling individual radio button inside radio group ([8a7b563](https://github.com/otto-de/b2b-design-system/commit/8a7b563589caa3506e2473d3010401544c4c3c24))

## [1.31.2](https://github.com/otto-de/b2b-design-system/compare/v1.31.1...v1.31.2) (2025-07-10)


### Bug Fixes

* **wizard:** [CCOP-114] Center numbers in wizard step ([#589](https://github.com/otto-de/b2b-design-system/issues/589)) ([abfb9b6](https://github.com/otto-de/b2b-design-system/commit/abfb9b6466b16deb120e54109e812e45418cf6eb))

## [1.31.1](https://github.com/otto-de/b2b-design-system/compare/v1.31.0...v1.31.1) (2025-06-26)


### Bug Fixes

* **textarea:** fix textarea resize on input change ([4435433](https://github.com/otto-de/b2b-design-system/commit/4435433a5e564ab2b9ab59044331abffbcb58c04))

# [1.31.0](https://github.com/otto-de/b2b-design-system/compare/v1.30.0...v1.31.0) (2025-06-04)


### Features

* **stencil:** [BLA-1409] Reverting back to older version of stencil and typescript ([#583](https://github.com/otto-de/b2b-design-system/issues/583)) ([d86c57a](https://github.com/otto-de/b2b-design-system/commit/d86c57a3ad7dcbd21d14870959879ce150383c9f))

# [1.30.0](https://github.com/otto-de/b2b-design-system/compare/v1.29.2...v1.30.0) (2025-06-04)


### Bug Fixes

* **Breadcrumb:** [BLA-SPOC] Remove the margin from the navigation bar ([67f16f6](https://github.com/otto-de/b2b-design-system/commit/67f16f6292427bb0c687c6cf260c0958a344a9c3))


### Features

* **stencil:** [BLA-1409] Upgrading stencil and dependencies ([#581](https://github.com/otto-de/b2b-design-system/issues/581)) ([3dd090a](https://github.com/otto-de/b2b-design-system/commit/3dd090a6a7c0d4cc23c378f35bf1f934734019fc))

## [1.29.2](https://github.com/otto-de/b2b-design-system/compare/v1.29.1...v1.29.2) (2025-06-03)


### Bug Fixes

* **dropdown:** [BLA-1401] Adding selected,disabled for vue ([#579](https://github.com/otto-de/b2b-design-system/issues/579)) ([9bb2283](https://github.com/otto-de/b2b-design-system/commit/9bb2283f049b48d7da45b5583e6e8ff52418ba0b))

## [1.29.1](https://github.com/otto-de/b2b-design-system/compare/v1.29.0...v1.29.1) (2025-06-02)


### Bug Fixes

* **Datepicker:** [BLA-1408] update to watch the changes made to the property and behave responsively ([31fee0c](https://github.com/otto-de/b2b-design-system/commit/31fee0c1cb51ed8df501a8f026683aaf29bbf423))

# [1.29.0](https://github.com/otto-de/b2b-design-system/compare/v1.28.1...v1.29.0) (2025-05-27)


### Bug Fixes

* **dropdown:** [BLA-1382] Fix dropdown asynchronous load of option data ([#573](https://github.com/otto-de/b2b-design-system/issues/573)) ([8a61340](https://github.com/otto-de/b2b-design-system/commit/8a6134036b64ae0c43f7a1444d79fa09efeb5d03))


### Features

* **Datepicker:** [BLA-1404] Emit an event when clear icon is clicked ([048ba3b](https://github.com/otto-de/b2b-design-system/commit/048ba3b3e90b09be5d501f37da92ec49e112343b))

## [1.28.1](https://github.com/otto-de/b2b-design-system/compare/v1.28.0...v1.28.1) (2025-05-14)


### Bug Fixes

* **core:** move stencil-eslint-plugin to devDependencies ([#571](https://github.com/otto-de/b2b-design-system/issues/571)) ([e76fbf3](https://github.com/otto-de/b2b-design-system/commit/e76fbf303cea2fa42a223464adbbf383a54f3674))
* **Dropdown:** [BLA-1362] fix the dropdown options not fitting to the container ([a89aa7d](https://github.com/otto-de/b2b-design-system/commit/a89aa7d7807bdd1b38cdc1a84b011d489b9106dc))

# [1.28.0](https://github.com/otto-de/b2b-design-system/compare/v1.27.0...v1.28.0) (2025-04-29)


### Bug Fixes

* **Grid:** [BLA-1307] Fix the grid component responsiveness ([#569](https://github.com/otto-de/b2b-design-system/issues/569)) ([be52539](https://github.com/otto-de/b2b-design-system/commit/be5253922cde01e236d862ef2e5257c2b7a44597))
* **MultiselectDropdown:** [BLA-1320] Handle the asynchronous loading of selected options ([bcc4219](https://github.com/otto-de/b2b-design-system/commit/bcc421925578220a20a2a1101f8d7e95e97b3ffd))
* **snackbar:** [NEPTUNE-4648] Fix opened attribute update ([#566](https://github.com/otto-de/b2b-design-system/issues/566)) ([b4388b3](https://github.com/otto-de/b2b-design-system/commit/b4388b32b92f7158f10181ad73ffb13f5fcfbabe))


### Features

* **Datepicker:** [BLA-1320] Handle asynchronous rendering for array props ([32d67d0](https://github.com/otto-de/b2b-design-system/commit/32d67d0d20ba26145062de9ece3ec1ec5dfb29c7))
* **MultiselectDropdown:** [BLA-1320] Adds hint invalid and error message props ([d13109d](https://github.com/otto-de/b2b-design-system/commit/d13109d6dd85e5ac6463f438956155862eb4c863))
* **MultiselectDropdown:** [BLA-1320] Adds pro to add hint invalid and disabled states ([78759db](https://github.com/otto-de/b2b-design-system/commit/78759db08bdedb88055df5c21b15350bf90003e8))
* **MultiselectDropdown:** [BLA-1320] Adds required attribute to multiselect dropdown ([ab3af1a](https://github.com/otto-de/b2b-design-system/commit/ab3af1adbe1c0316b6b41dc0f28cef51fe4e42e6))

# [1.27.0](https://github.com/otto-de/b2b-design-system/compare/v1.26.3...v1.27.0) (2025-04-03)


### Bug Fixes

* **dropdown:** [BLA-1293] Fix dropdown option and update b2b-color-background-page ([#565](https://github.com/otto-de/b2b-design-system/issues/565)) ([750e74b](https://github.com/otto-de/b2b-design-system/commit/750e74b310b31cc2a8aa82faae1b9c808c929c9d))


### Features

* **chip:** [BLA-1272] Add custom margin for chip component ([#564](https://github.com/otto-de/b2b-design-system/issues/564)) ([92045e1](https://github.com/otto-de/b2b-design-system/commit/92045e15b58672e7a67f3bf2cb4ef90f6bfcfd43))

## [1.26.3](https://github.com/otto-de/b2b-design-system/compare/v1.26.2...v1.26.3) (2025-03-27)


### Bug Fixes

* **Grid:** [BLA-1269] Refrain from setting the maxwidth attribute for column ([ff7d224](https://github.com/otto-de/b2b-design-system/commit/ff7d2245840ac995346f730eadd58412697139fb))

## [1.26.2](https://github.com/otto-de/b2b-design-system/compare/v1.26.1...v1.26.2) (2025-03-26)


### Bug Fixes

* **Grid:** [BLA-1269] Remove the column gap that was added to the las… ([#559](https://github.com/otto-de/b2b-design-system/issues/559)) ([38e822b](https://github.com/otto-de/b2b-design-system/commit/38e822b78af4ad3b15dcf6da941132802d2ee04f))

## [1.26.1](https://github.com/otto-de/b2b-design-system/compare/v1.26.0...v1.26.1) (2025-03-20)


### Bug Fixes

* **Grid:** [BLA-SCOUT] Fix the span adjustment of columns having span less than 12 ([f68b1e4](https://github.com/otto-de/b2b-design-system/commit/f68b1e4be4c07c4ccfda2ac18de2436ebf5824f3))

# [1.26.0](https://github.com/otto-de/b2b-design-system/compare/v1.25.0...v1.26.0) (2025-03-20)


### Bug Fixes

* **backgroundBox:** [NEPTUNE-4597] add max width attribute ([#546](https://github.com/otto-de/b2b-design-system/issues/546)) ([f27aea3](https://github.com/otto-de/b2b-design-system/commit/f27aea3da56c2b981d3da37b5e020bf7dbd07085))
* **Datepicker:** [BLA-1209] Add required property ([#547](https://github.com/otto-de/b2b-design-system/issues/547)) ([c49ee91](https://github.com/otto-de/b2b-design-system/commit/c49ee91169e07f4d633be296617d42d0edd9ba6a))
* **Grid:** [BLA-1208] Adds logic to handle the overflowing columns ([#549](https://github.com/otto-de/b2b-design-system/issues/549)) ([1bacf1c](https://github.com/otto-de/b2b-design-system/commit/1bacf1cd6901b98389a53ffc731dd1adee6654e8))
* **snackbar:** [NEPTUNE-4601] add width prop for snackbar ([#550](https://github.com/otto-de/b2b-design-system/issues/550)) ([84bdf9e](https://github.com/otto-de/b2b-design-system/commit/84bdf9e543465c2a94330249921273d15c2a58d0))


### Features

* **input:** [JELLY-9427] Add input hint slot ([#554](https://github.com/otto-de/b2b-design-system/issues/554)) ([84656e6](https://github.com/otto-de/b2b-design-system/commit/84656e681cc7c948634011f9ab36cd1604590591))

# [1.24.0](https://github.com/otto-de/b2b-design-system/compare/v1.23.4...v1.24.0) (2025-02-27)


### Features

* **core:** add shimmer effect component ([6abbbfd](https://github.com/otto-de/b2b-design-system/commit/6abbbfd7c9f06e7ed14efb8d0491faef96db1a63))

## [1.23.4](https://github.com/otto-de/b2b-design-system/compare/v1.23.3...v1.23.4) (2025-02-24)


### Bug Fixes

* **Grid:** [BLA-1199] Add default column width so that the column doesnt collapses ([704453c](https://github.com/otto-de/b2b-design-system/commit/704453c51915a321a027d7f9ee6359b3022894f5))

## [1.23.3](https://github.com/otto-de/b2b-design-system/compare/v1.23.2...v1.23.3) (2025-02-21)


### Bug Fixes

* **Grid:** [BLA-1199] The column that doesnt fit in the current row should move to the next line ([4bf5ae0](https://github.com/otto-de/b2b-design-system/commit/4bf5ae0d6cde774a36ee6ea4adf386a2a464caab))

## [1.23.2](https://github.com/otto-de/b2b-design-system/compare/v1.23.1...v1.23.2) (2025-02-21)


### Bug Fixes

* **Grid:** [BLA-1199] Consider only the direct children of the row while calculating span ([63c952e](https://github.com/otto-de/b2b-design-system/commit/63c952e96080e484ee0433863ec2940b42b20f36))

## [1.23.1](https://github.com/otto-de/b2b-design-system/compare/v1.23.0...v1.23.1) (2025-02-20)


### Bug Fixes

* **Grid:** [BLA-1199] Calculate and set span for columns from parent ([8d3868c](https://github.com/otto-de/b2b-design-system/commit/8d3868c9cf8afb30657f8485cca10a74fde9bf10))

# [1.23.0](https://github.com/otto-de/b2b-design-system/compare/v1.22.0...v1.23.0) (2025-02-18)


### Bug Fixes

* **Grid:** [BLA-1177] | Fix Grid column wrap bug ([33445b2](https://github.com/otto-de/b2b-design-system/commit/33445b2205acf4c776e264faaefdeccbbf9ac24f))
* **Grid:** [BLA-1177] | Fix Grid column wrap bug ([b060271](https://github.com/otto-de/b2b-design-system/commit/b0602710f292fa22f6993495a27ff5216a53e229))
* **snackbar:** [NEPTUNE-4514] make close btn mandatory, remove is-underlined and fix CTA styling ([#540](https://github.com/otto-de/b2b-design-system/issues/540)) ([17c14f8](https://github.com/otto-de/b2b-design-system/commit/17c14f8cb83f083f2ac17a61f4ded610ebf6a28e))


### Features

* **BackgroundBox:** [NEPTUNE-4563] add border styles  ([#533](https://github.com/otto-de/b2b-design-system/issues/533)) ([d3a0c0e](https://github.com/otto-de/b2b-design-system/commit/d3a0c0ef38cde337292cc0bbcaef2afa6ffd3ba8))
* **input:** add input label slot ([d4f0c06](https://github.com/otto-de/b2b-design-system/commit/d4f0c0667f5e18961842b3060beb34ec6da72e8c))
* **Snackbar:** [NEPTUNE-4514] Adds Snackbar component ([#534](https://github.com/otto-de/b2b-design-system/issues/534)) ([b045a60](https://github.com/otto-de/b2b-design-system/commit/b045a60ca6f7b898496742c5300d83b4fc7b5980))

# [1.22.0](https://github.com/otto-de/b2b-design-system/compare/v1.21.0...v1.22.0) (2025-01-30)


### Bug Fixes

* **Table:** [BLA-SCOUT] Fix table accordion rendering logic to adhere to async render ([c24f731](https://github.com/otto-de/b2b-design-system/commit/c24f73155f8f1d2a85f4cf38a15b164d4b61ffa6))


### Features

* **Datepicker:** [BLA-1014] Add the datepicker improvement props for disabling dates, showing hint messages and localisation ([#531](https://github.com/otto-de/b2b-design-system/issues/531)) ([eed6dd3](https://github.com/otto-de/b2b-design-system/commit/eed6dd355162c748c2526f5ec8a8375ac483a04e))

# [1.21.0](https://github.com/otto-de/b2b-design-system/compare/v1.20.0...v1.21.0) (2025-01-21)


### Bug Fixes

* **Alert:** [BLA-SCOUT] Make the large as default value for size ([6332c1b](https://github.com/otto-de/b2b-design-system/commit/6332c1b85133e7bb6c2c6432b785eebaa4646979))
* **Icon100:** [BLA-SCOUT] Update the icon to adapt the fill color ([eac80a6](https://github.com/otto-de/b2b-design-system/commit/eac80a6ed85bcd0dc002f0d11e6bc3db7931a0d0))
* **ProgressBar:** [SCOUT] add missing progress bar font ([#526](https://github.com/otto-de/b2b-design-system/issues/526)) ([ad96022](https://github.com/otto-de/b2b-design-system/commit/ad960228b9858c99c3a60fb12104ccd0b0e91df9))


### Features

* **Anchor:** [BLA-1055] B2B-Anchor make hover color inheritable ([7c06b93](https://github.com/otto-de/b2b-design-system/commit/7c06b9364fdaaa66bbb1f36d8f2fca842a83e8c9))
* **Anchor:** [BLA-1055] B2B-Anchor make hover color inheritable ([e4f6875](https://github.com/otto-de/b2b-design-system/commit/e4f687514083e2d298f88b5edbbcbad2e42e42e7))
* **Anchor:** [BLA-SCOUT] Add no underline feature to anchor ([3a37e92](https://github.com/otto-de/b2b-design-system/commit/3a37e9271cc8d515f99ea4b70de70085991f7e9e))
* **Radio:** [JELLY-8960] add label slot to radio button and group ([#524](https://github.com/otto-de/b2b-design-system/issues/524)) ([dbbf0a2](https://github.com/otto-de/b2b-design-system/commit/dbbf0a2763c0ffda323339361a7cb5095a4d613c))

# [1.20.0](https://github.com/otto-de/b2b-design-system/compare/v1.19.0...v1.20.0) (2024-12-12)


### Bug Fixes

* **Checkbox:** use correct class for multi-line label alignment ([#518](https://github.com/otto-de/b2b-design-system/issues/518)) ([758f462](https://github.com/otto-de/b2b-design-system/commit/758f462e73f8817e69b41320047ee99bdba01556))
* **DatePicker:** [BLA-SCOUT] Reduce the date picker z-index ([9181df0](https://github.com/otto-de/b2b-design-system/commit/9181df0b2426d8893f0c0c7830a67d5e028c5358))
* **Datepicker:** fix date picker focus issue ([fc89a28](https://github.com/otto-de/b2b-design-system/commit/fc89a286b89e06d201b48eaaa35eefe1c26d36e6))
* **Icon 50:** fixed inherit variant of icon by removing fill attr in svg files ([#490](https://github.com/otto-de/b2b-design-system/issues/490)) ([60731e7](https://github.com/otto-de/b2b-design-system/commit/60731e7c8bd48775d933e2396346b98e60bfee24))
* **Modal:** [BLA-SCOUT] Increase the modal z-index to have a higher value ([5659845](https://github.com/otto-de/b2b-design-system/commit/5659845d9fccd9f2255d8260749e7bbb1593018b))
* **Table:** [GC-2220] accordion table rows now add control cells correctly on each first render ([#517](https://github.com/otto-de/b2b-design-system/issues/517)) ([1a71693](https://github.com/otto-de/b2b-design-system/commit/1a71693e6124dbeb169edce66c60e60697dac502))


### Features

* **Breadcrumb:** [BLA-1021] make padding configurable ([3826540](https://github.com/otto-de/b2b-design-system/commit/382654045dd408e33ccc7c5c22f3d3bf1327d519))
* **Breadcrumb:** [BLA-1021] make padding configurable ([656e718](https://github.com/otto-de/b2b-design-system/commit/656e718a5664f7789ba0419e086183f33f40931c))

# [1.19.0](https://github.com/otto-de/b2b-design-system/compare/v1.18.0...v1.19.0) (2024-12-04)


### Bug Fixes

* **MultiselectDropdown:** [BLA-1038] Fix the multi select drop down option list prop to adhere to vue js ([#516](https://github.com/otto-de/b2b-design-system/issues/516)) ([c42a88c](https://github.com/otto-de/b2b-design-system/commit/c42a88c0b9d4fa645ae1c4089e8bbe3513b8ca04))


### Features

* **Checkbox:** [JELLY-8594] add label slot ([#514](https://github.com/otto-de/b2b-design-system/issues/514)) ([f47a23b](https://github.com/otto-de/b2b-design-system/commit/f47a23b1794235936d4903efa18c64c2698fec21))
* **Paragraph:** [BLA-705] optional bottom margin and grey-400 variant ([d360173](https://github.com/otto-de/b2b-design-system/commit/d360173b6d424f124d2be806266b7a0a1b409a8c))

# [1.18.0](https://github.com/otto-de/b2b-design-system/compare/v1.17.0...v1.18.0) (2024-11-08)


### Bug Fixes

* **FlyoutMenu:** [BLA-1003] Close flyout menu on click of the icon ([f016fbf](https://github.com/otto-de/b2b-design-system/commit/f016fbfcd9d11f4995dd61a28d6391728139aa1d))
* **Icon100:** [BLA-1020] Update the light bulb icon with the correct onw ([#509](https://github.com/otto-de/b2b-design-system/issues/509)) ([dbf0896](https://github.com/otto-de/b2b-design-system/commit/dbf089636f4ee648aebdaff953d4fc820a41c3db))


### Features

* **core:** [NEPTUNE-4379] add background-box component ([c2e4c65](https://github.com/otto-de/b2b-design-system/commit/c2e4c652147b476de28483889c3ee528f292d27c))

# [1.17.0](https://github.com/otto-de/b2b-design-system/compare/v1.16.0...v1.17.0) (2024-10-24)


### Bug Fixes

* **DatePicker:** [BLA-996] Fix the error handling scenario ([#506](https://github.com/otto-de/b2b-design-system/issues/506)) ([75267c8](https://github.com/otto-de/b2b-design-system/commit/75267c8db153f59e8194441c19b20339a22bd359))


### Features

* **Calendar:** [BLA-694] add months and years views to calendar ([fbd12ef](https://github.com/otto-de/b2b-design-system/commit/fbd12ef9fa7743a8ace947da71b7730ec4353fbf))
* **DatePicker:** [BLA-853] Date picker improvements ([24b0344](https://github.com/otto-de/b2b-design-system/commit/24b034450d71665db75df406549b52497001403c))
* **DatePicker:** [BLA-996] Close date picker when there is a formatting issue ([22b0b30](https://github.com/otto-de/b2b-design-system/commit/22b0b30628e87f2116f66a0ab3206c381078bba8))
* **DatePicker:** [BLA-996] focus out on blur ([044c763](https://github.com/otto-de/b2b-design-system/commit/044c7630fd763684252fdcc225cea4a9db494cfc))
* **DatePicker:** [BLA-996] Loose focus on selection of date ([d61072f](https://github.com/otto-de/b2b-design-system/commit/d61072f93e3725b42200803ea115355fd64db48d))
* **DatePicker:** [BLA-996] Provide prop to choose to show or hide hint message ([5434b44](https://github.com/otto-de/b2b-design-system/commit/5434b44bb58f3f9db2265a1b423fd2b500aa4d60))
* **DatePicker:** [BLA-996] Should not remove selected date when enter is pressed ([44e47dd](https://github.com/otto-de/b2b-design-system/commit/44e47ddb20781ced271707be92eb3d9fa2d63573))
* **DatePicker:** [BLA-996] Should not remove selected date when enter is pressed ([7577107](https://github.com/otto-de/b2b-design-system/commit/757710743c391182ed8f193d79e25cd69c21f3a7))

# [1.16.0](https://github.com/otto-de/b2b-design-system/compare/v1.15.1...v1.16.0) (2024-10-09)


### Bug Fixes

* **FlyoutMenuOption:** added shadow:true & css ([#498](https://github.com/otto-de/b2b-design-system/issues/498)) ([08eb1c6](https://github.com/otto-de/b2b-design-system/commit/08eb1c6cf6986803fbb9a4db847ce71b4b4cc372))


### Features

* **Icons:** [BLA-969] Added duplicate icon for Icon and Icon 100 components ([db7dce9](https://github.com/otto-de/b2b-design-system/commit/db7dce966a0effcc1d5cf0b9626c2e279106610a))

## [1.15.1](https://github.com/otto-de/b2b-design-system/compare/v1.15.0...v1.15.1) (2024-09-19)


### Bug Fixes

* **Calendar:** [BLA-682] fix Pagination issue and calendar ([51834f5](https://github.com/otto-de/b2b-design-system/commit/51834f51e7094ed2c8a5f5fc4bd56aa6fa20c1f6))

# [1.15.0](https://github.com/otto-de/b2b-design-system/compare/v1.14.1...v1.15.0) (2024-09-10)


### Bug Fixes

* **Input:** [BLA-936] Change B2b Input label colour to b2b-black-100 ([5014910](https://github.com/otto-de/b2b-design-system/commit/501491002b21ff8d437770c7af6fd846b76e4088))
* **toolTip:** [BLA-899] BUG - Focus Tooltip shows error in Storybook ([c812137](https://github.com/otto-de/b2b-design-system/commit/c8121378315e3121c861725e96f14ad40c7da19f))


### Features

* **Tokens:** [BLA-704] Add a new color token for hover effect ([ae26b31](https://github.com/otto-de/b2b-design-system/commit/ae26b31a9d7381e7caeef8850c6c7a1cfd71a4be))

## [1.14.1](https://github.com/otto-de/b2b-design-system/compare/v1.14.0...v1.14.1) (2024-09-04)


### Bug Fixes

* **Icons:** [BLA-775] Change icon to have chat icon ([b933859](https://github.com/otto-de/b2b-design-system/commit/b9338590166ed75c7d51dfba459504c3f6f9b7b5))


### Reverts

* Revert "fix(Input): [BLA-869] Inputs with a Pre- and Suffix (Improvement)" ([da0e187](https://github.com/otto-de/b2b-design-system/commit/da0e187c17ee5d4889c4b1e7ee76f7c01ea6bdd9))

# [1.14.0](https://github.com/otto-de/b2b-design-system/compare/v1.13.0...v1.14.0) (2024-09-04)


### Bug Fixes

* **Input:** [BLA-869] Inputs with a Pre- and Suffix (Improvement) ([42e2598](https://github.com/otto-de/b2b-design-system/commit/42e2598ab9aa4181028f3b47ed943d09c1246145))


### Features

* **Icons:** [BLA-775] Update Icons to Storybook ([a412997](https://github.com/otto-de/b2b-design-system/commit/a412997b79550d170b249331bb634ead035143f5))

# [1.13.0](https://github.com/otto-de/b2b-design-system/compare/v1.12.4...v1.13.0) (2024-09-03)


### Features

* **Icons:** [BLA-775] Update Icons to Storybook ([9075bb6](https://github.com/otto-de/b2b-design-system/commit/9075bb6ef9165955caddcd2eb01519a826a75bfd))

## [1.12.4](https://github.com/otto-de/b2b-design-system/compare/v1.12.3...v1.12.4) (2024-09-03)


### Bug Fixes

* **Icons:** [BLA-775] Update Icons to Storybook ([ff41809](https://github.com/otto-de/b2b-design-system/commit/ff418094d3b5e99f321585d4b93684894a8f4e4a))

## [1.12.3](https://github.com/otto-de/b2b-design-system/compare/v1.12.2...v1.12.3) (2024-09-02)


### Bug Fixes

* **Icons:** [BLA-775] Update Icons to Storybook ([137949a](https://github.com/otto-de/b2b-design-system/commit/137949a7b785e496b2ec9462090dd3c07bed476f))

## [1.12.2](https://github.com/otto-de/b2b-design-system/compare/v1.12.1...v1.12.2) (2024-08-20)


### Bug Fixes

* **FlyoutMenu:** [BLA-SCOUT] Emit option select event after slight delay ([862eef4](https://github.com/otto-de/b2b-design-system/commit/862eef494ed212a0dd0794af039bb37c24e9dc1f))

## [1.12.1](https://github.com/otto-de/b2b-design-system/compare/v1.12.0...v1.12.1) (2024-07-31)


### Bug Fixes

* **Table:** [BLA-882] selected table hover effect color correction ([692a771](https://github.com/otto-de/b2b-design-system/commit/692a771e44e5c1fe66082d05e0f846a39c720aab))

# [1.12.0](https://github.com/otto-de/b2b-design-system/compare/v1.11.1...v1.12.0) (2024-07-16)


### Bug Fixes

* **snaphot:** [BLA-794] added snapshot for initial selected values ([6edfb5c](https://github.com/otto-de/b2b-design-system/commit/6edfb5ce21cccef9c0fa8bef46b88073706c265c))


### Features

* **Modal:** [BLA-803] Add slot for icons in modal header ([4a9bce2](https://github.com/otto-de/b2b-design-system/commit/4a9bce2bd37f0258e8193e29a1d5b3a4bdd5e736))
* **Modal:** [BLA-803] Add slot for icons in modal header ([5709fa4](https://github.com/otto-de/b2b-design-system/commit/5709fa40a30cc0dce1175bd882a9120096e7e41a))
* **Multiselect Dropdown:** [BLA-794] added a prop to set initial selected values ([3a5006e](https://github.com/otto-de/b2b-design-system/commit/3a5006ee4596a5693a8e29189004f6e8fd2ae111))

## [1.11.1](https://github.com/otto-de/b2b-design-system/compare/v1.11.0...v1.11.1) (2024-06-18)


### Bug Fixes

* **docker:** [BLA-816] added network alias for snapshot tests ([14ada18](https://github.com/otto-de/b2b-design-system/commit/14ada18adbb18b3dba662178f2feb69dce812f9d))
* **snapshot:** [BLA-816] updated snapshots ([ae4f650](https://github.com/otto-de/b2b-design-system/commit/ae4f650ccb7843c90bbe2922e8ac30b0c38360e5))
* **snapshot:** [BLA-816] updated snapshots with icons ([61207ef](https://github.com/otto-de/b2b-design-system/commit/61207ef3ec969cc4fc4a368f90b471d0af4bdbd6))

# [1.11.0](https://github.com/otto-de/b2b-design-system/compare/v1.10.1...v1.11.0) (2024-06-04)


### Bug Fixes

* **Docker:** [BLA-761] Add visual regression stage on pull request, for testing ([bde5a8f](https://github.com/otto-de/b2b-design-system/commit/bde5a8ff8ee9ebf26e5f69898364464ea4720199))
* **Docker:** [BLA-761] Revert visual regression stage on pull request ([32d0be8](https://github.com/otto-de/b2b-design-system/commit/32d0be84dfaf0b29a6a0d52532c892e9d3bc938f))
* **Docker:** [BLA-761] Update docker image ([952e4bc](https://github.com/otto-de/b2b-design-system/commit/952e4bc69ec7bd6fe340e7bdbc7aad2d4fef5759))
* **Icon-100:** [BLA-773] Update build path for icon-100 ([be0a8d8](https://github.com/otto-de/b2b-design-system/commit/be0a8d89935900d2cd115eff90a160261ef62651))
* **icons:** [BLA-752] Fix icon hide alignment ([a8c9c9a](https://github.com/otto-de/b2b-design-system/commit/a8c9c9a01c9d373c24786ff8cd98558bd63acc54))
* **Input:** [BLA-719] Fix styles in Input ([42f9889](https://github.com/otto-de/b2b-design-system/commit/42f988969cd3334b301bf358403fe903a4d40ee1))
* **Input:** [BLA-719] Update snapshot for input component. ([f02661d](https://github.com/otto-de/b2b-design-system/commit/f02661d26fcd27d8af095ad77d8a2d2d2bdd9745))
* **Input:** [BLA-719] Updates snapshot tests ([0592757](https://github.com/otto-de/b2b-design-system/commit/0592757c0d5279fdf2e014a61328b939cda8a8e2))
* **snapshot:** [BLA-697] Fix snapshot test ([6ded2f9](https://github.com/otto-de/b2b-design-system/commit/6ded2f9839bb5eccb3921b2501551593cb9f0e8b))
* **snapshot:** [BLA-697] Fix snapshot test ([e989b50](https://github.com/otto-de/b2b-design-system/commit/e989b5000c1eef40d74df3ad840215e608a56a85))
* **snapshots:** [BLA-772] Enable visual regression on pipeline ([b7eb949](https://github.com/otto-de/b2b-design-system/commit/b7eb949bfa5af9d2b79693845e7224b15756886f))
* **snapshots:** [BLA-772] Fix snapshot test ([5e3b4f5](https://github.com/otto-de/b2b-design-system/commit/5e3b4f57d282b8428fd0187d99a91289e0cc178a))
* **snapshots:** [BLA-772] Updates snapshot tests and enable visual regression on pipeline ([d6e0fc7](https://github.com/otto-de/b2b-design-system/commit/d6e0fc70b69649a4cd667bc82f9918a55eca2df7))


### Features

* **Calendar:** [BLA-693] Fix conflicts ([bd283d0](https://github.com/otto-de/b2b-design-system/commit/bd283d0ad2e7fe06f42d6d60118ab3f6c595bdc7))
* **Calender:** [BLA-693] Add accessibility for calender days component ([85e6200](https://github.com/otto-de/b2b-design-system/commit/85e620068a33b18fd4b00a24855ab790218a5ed3))
* **Calender:** [BLA-693] add aria label for icons ([5a9c766](https://github.com/otto-de/b2b-design-system/commit/5a9c7665b320b9352e006faadc22985c9122d5e6))
* **Calender:** [BLA-693] Add background color to the calendar ([6616b89](https://github.com/otto-de/b2b-design-system/commit/6616b8909a7c26f5a85b94c349c202b1fa329b0e))
* **Calender:** [BLA-693] Add focus to 1st day of month for other months ([487d1a9](https://github.com/otto-de/b2b-design-system/commit/487d1a90ce3adc78c1120751e28d5b4314f1c447))
* **Calender:** [BLA-693] Adds accessibilty ([8f2bfce](https://github.com/otto-de/b2b-design-system/commit/8f2bfceb1934b1c1d0125277553ecf9821d7802f))
* **Calender:** [BLA-693] Adds disable and cross button features ([3bf1d0f](https://github.com/otto-de/b2b-design-system/commit/3bf1d0fbdb74c194ed27a29363755d7c7c3a1496))
* **Calender:** [BLA-693] Adds documentation for calendar component ([d880031](https://github.com/otto-de/b2b-design-system/commit/d8800314217d288672041f648dd71d36fe95cfb3))
* **Calender:** [BLA-693] Adds e2e test ([2b4f7c2](https://github.com/otto-de/b2b-design-system/commit/2b4f7c22c54afc61c9336ec50125ddfe3bfb2fd0))
* **Calender:** [BLA-693] Adds interaction to default state of the calendar ([1ce8c7e](https://github.com/otto-de/b2b-design-system/commit/1ce8c7ec7aebf0d78d64d2f693c4eda6b43a0606))
* **Calender:** [BLA-693] Adds lint fix ([db2ed00](https://github.com/otto-de/b2b-design-system/commit/db2ed0078ad065c897d6a3e59c6c1385f813388f))
* **Calender:** [BLA-693] Adds property description for calander header component ([4b4f9b2](https://github.com/otto-de/b2b-design-system/commit/4b4f9b201fcd9888dc89c97bed42475196d38222))
* **Calender:** [BLA-693] Adds snapshots for calendar component ([50085af](https://github.com/otto-de/b2b-design-system/commit/50085af8f5a4b9d33bc995e7682479d8647b3c27))
* **Calender:** [BLA-693] Adds spec test ([50450fb](https://github.com/otto-de/b2b-design-system/commit/50450fb67d60d37259d455b43e08972277e5285a))
* **Calender:** [BLA-693] Adds style changes ([62ad2d6](https://github.com/otto-de/b2b-design-system/commit/62ad2d6e96cdc24b3a89660495144d06c176673d))
* **Calender:** [BLA-693] Changes the tokens ad css fixes ([b5ff341](https://github.com/otto-de/b2b-design-system/commit/b5ff341b9d64a6c4f692a3ff94d0a8b3509d0723))
* **Calender:** [BLA-693] Emit event when date is selected from calender days component ([67b2ee0](https://github.com/otto-de/b2b-design-system/commit/67b2ee0f617b3db4658c5d16965d8376d0693620))
* **Calender:** [BLA-693] Fixes days of the month and adds styles ([8d296e6](https://github.com/otto-de/b2b-design-system/commit/8d296e60c7ac5e32dd99ebb1b9d74179db3fd521))
* **Calender:** [BLA-693] Import b2b tokens in css file ([33fd3b0](https://github.com/otto-de/b2b-design-system/commit/33fd3b09c603c091d24e49ee1319971ab5d46e26))
* **Calender:** [BLA-693] Lint changes ([a0f39ae](https://github.com/otto-de/b2b-design-system/commit/a0f39aebeb982290af9d46c00f14562d4b6c3b5f))
* **Calender:** [BLA-693] lint fix ([06764e7](https://github.com/otto-de/b2b-design-system/commit/06764e7a7e062261b73d7743e797caa41c75ec1e))
* **Calender:** [BLA-693] Lint fix ([eb14f47](https://github.com/otto-de/b2b-design-system/commit/eb14f47b74555c7527f2f8060863011520f2ab23))
* **Calender:** [BLA-693] Makes cursor as pointer on hover effect on dates ([93d731c](https://github.com/otto-de/b2b-design-system/commit/93d731c0dbe2cbe53d6cefe0e6fae0f6ae19bd8c))
* **Calender:** [BLA-693] Makes the calender component to be open when close icon is clicked ([0c10bf8](https://github.com/otto-de/b2b-design-system/commit/0c10bf81a0b338630fb542330902e92630737b50))
* **Calender:** [BLA-693] Moves focus to today's date by default ([68f312b](https://github.com/otto-de/b2b-design-system/commit/68f312b7bdcf5ff3ea84cf7495918cd4edff64b9))
* **Calender:** [BLA-693] Refactor and css enhancements ([376f952](https://github.com/otto-de/b2b-design-system/commit/376f95279aa1b222cd05023502210bd32d6ef79e))
* **Calender:** [BLA-693] Refactor events ([137e118](https://github.com/otto-de/b2b-design-system/commit/137e118fda32c04231eb833fda3d1a0acf326a37))
* **Calender:** [BLA-693] Style changes for calender and close icon ([4ccff6b](https://github.com/otto-de/b2b-design-system/commit/4ccff6b167ebe162c4b44941fe5d22502c10e402))
* **Calender:** [BLA-693] undo changes on package-lock ([f4b72f5](https://github.com/otto-de/b2b-design-system/commit/f4b72f5ad9c5e441ee7f84e823c205d231567eec))
* **Chip:** [BLA-768] added type and label style props for chip ([0391ab4](https://github.com/otto-de/b2b-design-system/commit/0391ab425a79b600923fa6ee544c2e5647560812))
* **datepicker:** [BLA-693] Adds date selection to date picker component ([9d3048e](https://github.com/otto-de/b2b-design-system/commit/9d3048e27c53d144cd683dcd540cc29127ecd803))
* **Icon-50:** [BLA-697] Implements Icon-50 component ([#480](https://github.com/otto-de/b2b-design-system/issues/480)) ([0ab55aa](https://github.com/otto-de/b2b-design-system/commit/0ab55aac66093aba7842804b89f9a60a8d463ca7))

## [1.10.1](https://github.com/otto-de/b2b-design-system/compare/v1.10.0...v1.10.1) (2024-05-09)


### Bug Fixes

* **icons:** [BLA-752] Removed hide icon's dimensions ([73938d7](https://github.com/otto-de/b2b-design-system/commit/73938d78c09864e25e7f60279ad6c7d72d0524b0))

# [1.10.0](https://github.com/otto-de/b2b-design-system/compare/v1.9.0...v1.10.0) (2024-05-07)


### Bug Fixes

* **Docker:** [BLA-761] Add visual regression stage on pull request, for testing ([19e6468](https://github.com/otto-de/b2b-design-system/commit/19e64682abe695a85b0d61181082278ec64eab09))
* **Docker:** [BLA-761] Revert visual regression stage on pull request ([b54b4ec](https://github.com/otto-de/b2b-design-system/commit/b54b4ec4ff6ff2c012bebc083d3611ef77510ae8))
* **Docker:** [BLA-761] Update docker image ([5c50bbb](https://github.com/otto-de/b2b-design-system/commit/5c50bbb726b381f8c37d5171856ee09b3eea43d6))
* **Flyout Menu:** added expansion to the left for longer text ([f072b18](https://github.com/otto-de/b2b-design-system/commit/f072b185721c061a4dc2c1e91ea26e33ef882252))
* **icons:** [BLA-752] Fix icon hide alignment ([ff06108](https://github.com/otto-de/b2b-design-system/commit/ff0610813200303423d2a812c102c7265255cdef))
* **Input List:** removed focus change issue after refocusing clear icon ([359b5d2](https://github.com/otto-de/b2b-design-system/commit/359b5d24c30f90441de85e124b8ce25be39e4c4f))
* **Input:** [BLA-719] Fix styles in Input ([839a856](https://github.com/otto-de/b2b-design-system/commit/839a8564e0f6cd91b77e2a9cd474d1b1956ce254))
* **Input:** [BLA-719] Update snapshot for input component. ([b8eb72b](https://github.com/otto-de/b2b-design-system/commit/b8eb72bac2ab0ed068a8d49a2b441cae3c0dcd2d))
* **Input:** [BLA-719] Updates snapshot tests ([74eea57](https://github.com/otto-de/b2b-design-system/commit/74eea5752b94227b9a019a6d26621c540e237e26))
* **Toggle Switch:** removed label margin for left facing label ([329a6c0](https://github.com/otto-de/b2b-design-system/commit/329a6c0a6e7070c60d213447496a15a26318442a))
* **Tokens:** [BLA-667] updated normal font weight from 400 to 500 ([ba9966f](https://github.com/otto-de/b2b-design-system/commit/ba9966f6b308744685eca61fb096271a3bb1dc0b))


### Features

* **Icon 100:** [BLA-696] added icon 100 component ([760c9d2](https://github.com/otto-de/b2b-design-system/commit/760c9d2cd8c2659a389f61ca68bb299c0eb134a0))
* **Icon:** [BLA-651] added size 50 icons from otto_icon_library ([0bc2be9](https://github.com/otto-de/b2b-design-system/commit/0bc2be926f5be4bb6660d71211a34114eccee8a7))
* **Icon:** [BLA-680] added focusable prop to icon for menu ([7c1f94a](https://github.com/otto-de/b2b-design-system/commit/7c1f94ad9feae27e398bfc5f24bc6356664a7785))
* **Table:** [BLA-742] | updates b2b-table docs to not use accordion table ([8ccfe4a](https://github.com/otto-de/b2b-design-system/commit/8ccfe4a3af5f5d46771f52450cdc4c41806394f1))
* **Toggle Switch:** [BLA-631] | Adds docs for toggle-switch ([3190f9c](https://github.com/otto-de/b2b-design-system/commit/3190f9c64b2cc9f94861a7f9075ccc23c97e8b17))
* **Toggle Switch:** [BLA-631] | Adds e2e test and storybook for toggle-switch ([3c0666d](https://github.com/otto-de/b2b-design-system/commit/3c0666dc04d75ace963240011a3d808dfc6faaaf))
* **Toggle Switch:** [BLA-631] | Adds toggle-switch component ([9e1e5bf](https://github.com/otto-de/b2b-design-system/commit/9e1e5bf34a32db2f3304ee45077a0ffb919d9fe4))
* **Toggle Switch:** [BLA-631] | Adds toggle-switch icon ([3289fee](https://github.com/otto-de/b2b-design-system/commit/3289feebb53c8a65a1647736de5893f7c132ec56))
* **Toggle Switch:** [BLA-631] | implements review comments ([3a24648](https://github.com/otto-de/b2b-design-system/commit/3a246482ce6be9fee839fe861e77eed18e0d6cc3))

# [1.9.0](https://github.com/otto-de/b2b-design-system/compare/v1.8.2...v1.9.0) (2024-02-15)


### Bug Fixes

* **Headline:** [B2BDS-255] updated lineheight to improve multiline appearance ([1c34f6e](https://github.com/otto-de/b2b-design-system/commit/1c34f6e882dc44f656e8044d84047abed1637efc))
* **Icon:** added inheritable color for warning hint icon ([b5a547e](https://github.com/otto-de/b2b-design-system/commit/b5a547e0708f431a729c3af559cab851f49e90ce))
* **Icon:** added inheritable color for warning hint icon ([dfebdfc](https://github.com/otto-de/b2b-design-system/commit/dfebdfcbecc4f453b2cd4a83f93b9cfacfb81139))
* **input-list:** [BLA-626] fixes input list with text bug ([0131ef2](https://github.com/otto-de/b2b-design-system/commit/0131ef210b1acec0ac11185c21451807da48cc5d))
* **Multiselect:** filtered select all now adds to preselection ([a965baf](https://github.com/otto-de/b2b-design-system/commit/a965baf07fa036ef076d784a5396cb02ab3346c0))


### Features

* **Button:** [B2BDS-215] width prop and pressed state for button ([995a8cc](https://github.com/otto-de/b2b-design-system/commit/995a8cc64bf51f008dfe8ee244b36bf49c80e7b9))
* **Icon:** [B2BDS-245] changed ellipsis icon to filled in version ([27c731f](https://github.com/otto-de/b2b-design-system/commit/27c731f34a457904bcc7d86792e7061514798ae0))
* **Icon:** added trend left and trend right icon ([f01c855](https://github.com/otto-de/b2b-design-system/commit/f01c855ba0f2b4b8e410f579d85e4efc6d684b25))
* **Icon:** added warning-hint icon ([32c916f](https://github.com/otto-de/b2b-design-system/commit/32c916f3b8ad2eeaceadab5414541898906bd697))
* **Icon:** added warning-hint icon ([a1823b5](https://github.com/otto-de/b2b-design-system/commit/a1823b5a7f7fa7399bb6f3f46f5e17aaf8292431))
* **Multiselect Dropdown:** [B2BDS-219] added multiselect dropdown component ([3ab3d0a](https://github.com/otto-de/b2b-design-system/commit/3ab3d0a6619b8edae473ab975ca2aed1a6f9a133))
* **Progress Bar:** [BLA-627] added progress bar component ([271089f](https://github.com/otto-de/b2b-design-system/commit/271089f40f8603fa9112ffa9990dcf0fca0728a6))
* **Table:** [B2BDS-192] colspan size for cells and headers ([96df9d1](https://github.com/otto-de/b2b-design-system/commit/96df9d1513031eef3290ffe305533933cdb4c9b3))
* **Toggle Chip:** [B2BDS-233] added toggle chip ([96bb108](https://github.com/otto-de/b2b-design-system/commit/96bb108fd2fc3592c52e20b4ab428ab99bb47a6d))

# [1.9.0-beta.2](https://github.com/otto-de/b2b-design-system/compare/v1.9.0-beta.1...v1.9.0-beta.2) (2023-11-28)

### Bug Fixes

* **Icon:** added inheritable color for warning hint icon ([dfebdfc](https://github.com/otto-de/b2b-design-system/commit/dfebdfcbecc4f453b2cd4a83f93b9cfacfb81139))

# [1.9.0-beta.1](https://github.com/otto-de/b2b-design-system/compare/v1.8.1...v1.9.0-beta.1) (2023-11-27)


### Features

* **Icon:** added warning-hint icon ([a1823b5](https://github.com/otto-de/b2b-design-system/commit/a1823b5a7f7fa7399bb6f3f46f5e17aaf8292431))

## [1.8.2](https://github.com/otto-de/b2b-design-system/compare/v1.8.1...v1.8.2) (2023-12-01)

### Bug Fixes

* **Anchor:** [B2BDS-237] added forced stacking context to avoid host element hiding anchor ([35d235c](https://github.com/otto-de/b2b-design-system/commit/35d235cce239afbac761db403669a77dcea289ba))


## [1.8.1](https://github.com/otto-de/b2b-design-system/compare/v1.8.0...v1.8.1) (2023-11-22)


### Bug Fixes

* **Chip:** fixed hover state for closeable chip ([e904bb0](https://github.com/otto-de/b2b-design-system/commit/e904bb01b101844a387f3c9bd5df844f8a60bb9b))

# [1.8.0](https://github.com/otto-de/b2b-design-system/compare/v1.7.0...v1.8.0) (2023-11-22)


### Bug Fixes

* **alert:** [B2BDS-218] Align error icon on the top for long text ([610ec59](https://github.com/otto-de/b2b-design-system/commit/610ec59121b50936ca228cfc4ff06373a92c5b76))
* updated docker ignore to not include dist ([b74cb8d](https://github.com/otto-de/b2b-design-system/commit/b74cb8d86535fa5a4415005f6d79d7e1b57d8c7f))


### Features

* **Icon:** [B2BDS-223] added carrier logos ([7e769af](https://github.com/otto-de/b2b-design-system/commit/7e769af261f691bacb19e26f5800c32f223c1fce))

# [1.7.0](https://github.com/otto-de/b2b-design-system/compare/v1.6.1...v1.7.0) (2023-10-26)


### Breaking changes

* **Vue Setup:** `defineCustomElements` must now be imported from `@otto-de/b2b-core-components/dist/loader` 



### Bug Fixes

* [B2BDS-211] Apply disabled style for a button with href ([2bd2aba](https://github.com/otto-de/b2b-design-system/commit/2bd2abaa58bba73ccd6832e98d45ca72cad76ce2))
* **Dropdown:** [B2BDS-222] moved dropdown out of shadow dom to prevent async data issues ([9c4d435](https://github.com/otto-de/b2b-design-system/commit/9c4d43583a9a3bfac4f1a61909926ef674f82b6f))
* **Tab Group:** [B2BDS-225] removed error in tab group when router is used ([9194ced](https://github.com/otto-de/b2b-design-system/commit/9194cedb7bc7bf9f50676ce1d9d62889f0bff796))
* **table:** [B2BDS-213] Vertically align checkbox in selectable rows ([05c7001](https://github.com/otto-de/b2b-design-system/commit/05c7001cce09364769ec4abc9dfc12f3d093153a))


### Features

* **breadcrumb:** add breadcrumb component from [#80](https://github.com/otto-de/b2b-design-system/issues/80) ([cd03882](https://github.com/otto-de/b2b-design-system/commit/cd03882ff4b79121fba7d142e461222eda309add))
* **breadcrumb:** add breadcrumb component from [#80](https://github.com/otto-de/b2b-design-system/issues/80) ([b1217c2](https://github.com/otto-de/b2b-design-system/commit/b1217c278faf45110959bd089968278ffae124e7))
* **Breadcrumb:** added active state ([8796d99](https://github.com/otto-de/b2b-design-system/commit/8796d992effc97813b4307af5c9ef82f2fa036f6))
* **Breadcrumb:** added breadcrumb component ([bc9a2d0](https://github.com/otto-de/b2b-design-system/commit/bc9a2d0653f0a91be85272787fb0140f2384030a))
* **core:** [B2BDS-208] Add chip component ([8ee9700](https://github.com/otto-de/b2b-design-system/commit/8ee970086f6873fb4d3b4e90365680232c569c26))
* **core:** [B2BDS-208] Fix chip without icon story ([23cbf61](https://github.com/otto-de/b2b-design-system/commit/23cbf6166a0414aa016020163ba625f505184fbd))
* **table:** [B2BDS-195] Add alignments to table header with sorting ([40450f2](https://github.com/otto-de/b2b-design-system/commit/40450f21c002c48e97ffd5550c8e8019fbb84d8e))

## [1.6.1](https://github.com/otto-de/b2b-design-system/compare/v1.6.0...v1.6.1) (2023-08-22)


### Bug Fixes

* **Table:** table sorting arrows now display correctly again ([4074cca](https://github.com/otto-de/b2b-design-system/commit/4074cca4d2d16e3b7153edde89a924a33b588a5e))

# [1.6.0](https://github.com/otto-de/b2b-design-system/compare/v1.5.0...v1.6.0) (2023-08-22)


### Bug Fixes

* **Checkbox Group:** [B2BDS-205] group disabled state now reliable ([4a0dbcb](https://github.com/otto-de/b2b-design-system/commit/4a0dbcbf6d23b7a4c3bf64670b78d2493188d560))
* **Input Group:** individual elements now correctly disabled in rerenders ([453ca16](https://github.com/otto-de/b2b-design-system/commit/453ca163373c0f652ee4f59e3ebd28975ff97314))


### Features

* **Checkbox Group:** [B2BDS-205] individual checkboxes in a group can be disabled ([cecc895](https://github.com/otto-de/b2b-design-system/commit/cecc895a1132c906ff7cde04ae7d45418e7ca3c3))
* **Checkbox:** [B2BDS-166] indeterminate state for checkbox ([3f3b2ba](https://github.com/otto-de/b2b-design-system/commit/3f3b2bae7f1382911fdb6a194a145138d9524c5d))
* **Table:** [B2BDS-166] selectable rows ([f8248d9](https://github.com/otto-de/b2b-design-system/commit/f8248d9d61d0bbc865ee765a998f7ee78f939e88))

# [1.5.0](https://github.com/otto-de/b2b-design-system/compare/v1.4.0...v1.5.0) (2023-07-03)


### Bug Fixes

* **Input Group:** [B2BDS-201] individual elements can be disabled now ([e700ace](https://github.com/otto-de/b2b-design-system/commit/e700aceb1e1bb837e0716bd53df072022e5e152d))
* **Search:** emit search event with enter key press ([14e36ac](https://github.com/otto-de/b2b-design-system/commit/14e36aca0c49e779fa787009faffefd4adbe7cba))


### Features

* **Wizard:** implements wizard component ([21c0a53](https://github.com/otto-de/b2b-design-system/commit/21c0a530cfe2312a0162a85e5d6455c8ff4146ea))

# [1.4.0](https://github.com/otto-de/b2b-design-system/compare/v1.3.3...v1.4.0) (2023-06-13)


### Bug Fixes

* fix release script ([9a36a6a](https://github.com/otto-de/b2b-design-system/commit/9a36a6a66837421c517c5316467734adc253766c))
* **Icon:** fix icons markup typo ([6b2be76](https://github.com/otto-de/b2b-design-system/commit/6b2be76301caa901575af24735457e6fac0c27b6))
* **Search:** make button icon show clickable cursor ([1dff3bb](https://github.com/otto-de/b2b-design-system/commit/1dff3bb97f0e15d71ecdfbe9189a9519dfbd82be))


### Features

* **Rounded-Icon:** [B2BDS-181] add rounded-icon component ([ad3d7f3](https://github.com/otto-de/b2b-design-system/commit/ad3d7f3a3b43c426aa4fef9552c9f1b2368726a3))
* **Wizard-Icon:** [B2BDS-181] add wizard-icon component ([da99cd2](https://github.com/otto-de/b2b-design-system/commit/da99cd24e877b2786608586b504c4a929be2bf0c))

# [1.4.0](https://github.com/otto-de/b2b-design-system/compare/v1.3.3...v1.4.0) (2023-06-13)


### Bug Fixes

* **Icon:** fix icons markup typo ([6b2be76](https://github.com/otto-de/b2b-design-system/commit/6b2be76301caa901575af24735457e6fac0c27b6))
* **Search:** make button icon show clickable cursor ([1dff3bb](https://github.com/otto-de/b2b-design-system/commit/1dff3bb97f0e15d71ecdfbe9189a9519dfbd82be))


### Features

* **Rounded-Icon:** [B2BDS-181] add rounded-icon component ([ad3d7f3](https://github.com/otto-de/b2b-design-system/commit/ad3d7f3a3b43c426aa4fef9552c9f1b2368726a3))
* **Wizard-Icon:** [B2BDS-181] add wizard-icon component ([da99cd2](https://github.com/otto-de/b2b-design-system/commit/da99cd24e877b2786608586b504c4a929be2bf0c))

# [1.4.0-beta.1](https://github.com/otto-de/b2b-design-system/compare/v1.3.3-beta.1...v1.4.0-beta.1) (2023-06-12)


### Bug Fixes

* **Icon:** fix icons markup typo ([6b2be76](https://github.com/otto-de/b2b-design-system/commit/6b2be76301caa901575af24735457e6fac0c27b6))


### Features

* **Rounded-Icon:** [B2BDS-181] add rounded-icon component ([ad3d7f3](https://github.com/otto-de/b2b-design-system/commit/ad3d7f3a3b43c426aa4fef9552c9f1b2368726a3))
* **Wizard-Icon:** [B2BDS-181] add wizard-icon component ([da99cd2](https://github.com/otto-de/b2b-design-system/commit/da99cd24e877b2786608586b504c4a929be2bf0c))

## [1.3.3](https://github.com/otto-de/b2b-design-system/compare/v1.3.2...v1.3.3) (2023-06-08)


### Bug Fixes

* implement feedback from design sign off ([8e64a07](https://github.com/otto-de/b2b-design-system/commit/8e64a07604e455edb8789d66abd05e4f8ce38db2))

## [1.3.3-beta.1](https://github.com/otto-de/b2b-design-system/compare/v1.3.2...v1.3.3-beta.1) (2023-06-08)


### Bug Fixes

* implement feedback from design sign off ([8e64a07](https://github.com/otto-de/b2b-design-system/commit/8e64a07604e455edb8789d66abd05e4f8ce38db2))

## [1.3.2](https://github.com/otto-de/b2b-design-system/compare/v1.3.1...v1.3.2) (2023-06-07)


### Bug Fixes

* trigger a new release ([f3cdd24](https://github.com/otto-de/b2b-design-system/commit/f3cdd24633382dc429902071e3c52197d14e1a17))

# [1.2.0](https://github.com/otto-de/b2b-design-system/compare/v1.1.0...v1.2.0) (2023-05-25)


### Bug Fixes

* **Radio:** [B2BDS-190] only emit change event when new value selected ([4714c6b](https://github.com/otto-de/b2b-design-system/commit/4714c6be52911312b9a6e0a3b557d3698c455613))
* **Toggle:** [B2BDS-190] only emit change event when new value selected ([3fcdf52](https://github.com/otto-de/b2b-design-system/commit/3fcdf529ef8d26e2db53c32c3269553bdd68de80))


### Features

* **docs:** [B2BDS-188] add updates to documentation ([6af5385](https://github.com/otto-de/b2b-design-system/commit/6af53854e91be81407d9bfe44449a4fde15ecba8))

# [1.1.0](https://github.com/otto-de/b2b-design-system/compare/v1.0.1...v1.1.0) (2023-05-16)


### Bug Fixes

* **InputList:** [B2BDS-187] emit event when clear is triggered ([16cce26](https://github.com/otto-de/b2b-design-system/commit/16cce26c5c24c138bae2e137db6b04759444b17c))
* **Toggle:** [B2BDS-183] only select first element if none is pre-selected ([f472658](https://github.com/otto-de/b2b-design-system/commit/f472658efb22aa35ec8a0136f811094cd67cac9d))


### Features

* **docs:** update readme links ([e9bd978](https://github.com/otto-de/b2b-design-system/commit/e9bd97808758692641359ba62a9f76c4d86ae8e1))
* **Table:** [B2BDS-146] truncated text expands on hover ([c95e651](https://github.com/otto-de/b2b-design-system/commit/c95e651c39ae6144a09e60c0bf1f9828c3691c73))

## [1.0.1](https://github.com/otto-de/b2b-design-system/compare/v1.0.0...v1.0.1) (2023-05-09)


### Bug Fixes

* **Modal:** footer buttons + close icon visual improvements ([9b1f3bc](https://github.com/otto-de/b2b-design-system/commit/9b1f3bc5ae4ac5e7cacb8f3cee192ca59ecc38cd))

# 1.0.0 (2023-04-26)


### Features

* open source design system mvp ([478ebc6](https://github.com/otto-de/b2b-design-system/commit/478ebc671b3f4bde0f2fb0f8261966a36a0a6fb3))
