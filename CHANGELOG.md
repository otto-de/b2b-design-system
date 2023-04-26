# 1.0.0 (2023-04-26)


### Features

* open source design system mvp ([478ebc6](https://github.com/otto-de/b2b-design-system/commit/478ebc671b3f4bde0f2fb0f8261966a36a0a6fb3))

# [1.2.0-beta.25](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.24...v1.2.0-beta.25) (2023-04-19)


### Features

* **table:** [B2BDS-177] add initial-sorting prop to set state after non-sorted ([dbdac79](https://github.com/otto-ec/b2b-design-system/commit/dbdac79503e2a6923cdc3c85e8950cb15c4918e8))
* **table:** [B2BDS-177] add sort-id prop to emit in change event ([0a7e47f](https://github.com/otto-ec/b2b-design-system/commit/0a7e47f4951c74ca5fa1a2bb64bcb3208917da0d))

# [1.2.0-beta.24](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.23...v1.2.0-beta.24) (2023-04-13)


### Bug Fixes

* **table:** only update sorting for sortable siblings ([7b057a0](https://github.com/otto-ec/b2b-design-system/commit/7b057a03cfd31b1cc71400cb29eed9c2cfe9bc91))


### Features

* **Checkbox:** [B2BDS-155] implement v-model support ([7987e12](https://github.com/otto-ec/b2b-design-system/commit/7987e12431250621aed4a1ffbb88dfba2a230b32))
* **Table:** [B2BDS-163] added sorting buttons ([a97bd42](https://github.com/otto-ec/b2b-design-system/commit/a97bd42de5696e044d3d90914c627169a4db962f))
* **table:** emit a table event with the current sorting change ([31b8dc9](https://github.com/otto-ec/b2b-design-system/commit/31b8dc92089e92b78d8356bcc6d6389455da70c7))

# [1.2.0-beta.23](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.22...v1.2.0-beta.23) (2023-03-22)


### Bug Fixes

* **Button:** [B2BDS-171] buttons used in a form will no longer submit if their type is not submit ([e6bb778](https://github.com/otto-ec/b2b-design-system/commit/e6bb778bbd96d5988007852cf38622dba017c378))
* health check endpoint now in line with load balancer redirect in nonlive ([49c1bdc](https://github.com/otto-ec/b2b-design-system/commit/49c1bdc3af4f239cdddbd9dbd030c09a3765f7d5))
* **Tooltip:** [B2BDS-156] fix issue of arrow moving away from box with long text ([04124f4](https://github.com/otto-ec/b2b-design-system/commit/04124f4e94e8c822515f83170620bbd30967d951))
* **Tooltip:** [B2BDS-156] fixed visual bug for long text and input size ([6d88162](https://github.com/otto-ec/b2b-design-system/commit/6d88162870cdfaf250c73f2310643c8391994253))


### Features

* [B2BDS-126] add value prop to support v-model ([d00ac04](https://github.com/otto-ec/b2b-design-system/commit/d00ac04bc8fa083424cc14bb2c085b2ad38e0487))
* **dx:** [B2BDS-90] adds vue web-types for JetBrains IDE support ([e3a374e](https://github.com/otto-ec/b2b-design-system/commit/e3a374e5b20ed52af3e3e93e37f3c52591a8a804))
* **Form Components:** [B2BDS-154] added reflect for all native form attributes ([3efb86b](https://github.com/otto-ec/b2b-design-system/commit/3efb86bb27141e9753a0ca37077253daa26ae983))
* **Grid Component:** [B2BDS-127] added grid component ([fb1ed23](https://github.com/otto-ec/b2b-design-system/commit/fb1ed236864b76da5d2dee76ec59250314068e8f))
* **Icon:** [B2BDS-161] added all Otto icons ([675d7b0](https://github.com/otto-ec/b2b-design-system/commit/675d7b0ce6f2c4bb023fc8f04c6b33ca610a7508))
* **Search:** [B2BDS-126] added clear icon and slot for custom options ([5a5b3b5](https://github.com/otto-ec/b2b-design-system/commit/5a5b3b5122859980c7522f9c9a37d3578e6c15c3))
* **Search:** [B2BDS-126] keyboard navigation for clear button and missing css vars ([53d69b4](https://github.com/otto-ec/b2b-design-system/commit/53d69b4a606d986eb8f17b1dbddd0c495e5e1a84))

# [1.2.0-beta.22](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.21...v1.2.0-beta.22) (2023-02-02)


### Bug Fixes

* **Radio:** [B2BDS-147] emits change event to work with vue v-model ([7534492](https://github.com/otto-ec/b2b-design-system/commit/7534492137f5c53524409f13ef0ffa9c4df39b71))


### Features

* **Form Elements:** [B2BDS-145] add required prop ([f07807d](https://github.com/otto-ec/b2b-design-system/commit/f07807d0db750630013821b5e1aacf9519b5250c))
* **Scrollable:** [B2BDS-85] add scrollable container component ([5ae5808](https://github.com/otto-ec/b2b-design-system/commit/5ae58088ca85418861e99da1d93840d12ce7570c))
* **Search:** [B2BDS-132] added esc press behavior ([93e818b](https://github.com/otto-ec/b2b-design-system/commit/93e818bcd4c63eaa968a165b7fab39875c36442f))
* **Search:** [B2BDS-132] added keyboard navigation and accessibility ([3522a0b](https://github.com/otto-ec/b2b-design-system/commit/3522a0be790bec2a8816c249f2aaa94b349ac063))
* **Table:** [B2BDS-85] add semantic colors to rows/cells ([1d64bc3](https://github.com/otto-ec/b2b-design-system/commit/1d64bc30f37db96949fade2dff872fac5b79483b))
* **Table:** [B2BDS-85] add sticky header to scrollable table ([0f87e1b](https://github.com/otto-ec/b2b-design-system/commit/0f87e1b716b785a471ba791ea5ffe288b2d847bb))
* **Table:** [B2BDS-85] support scrollable styles and add examples ([d05772d](https://github.com/otto-ec/b2b-design-system/commit/d05772d6fd2b281403cd4dbbeb1c93d06be0a227))

# [1.2.0-beta.21](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.20...v1.2.0-beta.21) (2023-01-23)


### Bug Fixes

* **Dropdown:** [B2BDS-138] dropdown arrow doesn't overlap text in small dropdowns ([39d7ead](https://github.com/otto-ec/b2b-design-system/commit/39d7ead6d1ceb7dc48f4aac676f7fec644446b49))
* **Pagination:** [B2BDS-116] add workaround for purgeCss removing custom properties ([97fac5c](https://github.com/otto-ec/b2b-design-system/commit/97fac5c36975fec720bcc4a7a0ac34d048d1b7d2))


### Features

* **Input:** [B2BDS-137] BREAKING CHANGE added start and end slots ([bd1163a](https://github.com/otto-ec/b2b-design-system/commit/bd1163a8a21fd0b1731d5c4df1a308cd5baf6ca2))
* **Pagination:** [B2BDS-116] add active state to button ([1846c17](https://github.com/otto-ec/b2b-design-system/commit/1846c1797ede285606753c55effdf97ed190f60f))
* **Pagination:** [B2BDS-116] add event emiter ([d7357e3](https://github.com/otto-ec/b2b-design-system/commit/d7357e34bb2bc16691898228f0783c4de0baab8f))
* **Pagination:** [B2BDS-116] add forward/back navigation ([0cc406b](https://github.com/otto-ec/b2b-design-system/commit/0cc406bea5d8c2822cdad8ea31ca40c05a733140))
* **Pagination:** [B2BDS-116] add item and Dots navigation ([de0cce0](https://github.com/otto-ec/b2b-design-system/commit/de0cce0aabe57b632041b900bb1e69166d58ef4c))
* **Pagination:** [B2BDS-116] add pagination styles ([b0d3938](https://github.com/otto-ec/b2b-design-system/commit/b0d39387c24c887ed6adfc2984efa37f3eb70a54))
* **Pagination:** [B2BDS-116] remove back or next buttons when applicable ([94ae332](https://github.com/otto-ec/b2b-design-system/commit/94ae33236e2ddad92515ea49fee54eabd5113f85))
* **Pagination:** [B2BDS-116] show up to 5 items and include dots ([e9af747](https://github.com/otto-ec/b2b-design-system/commit/e9af7474c99d1f19a9df41fd4bb37a1f21dbbe6f))
* **Pagination:** [B2BDS-116] watch for dynamic changes in props ([c256419](https://github.com/otto-ec/b2b-design-system/commit/c2564199113edf97047360edbbc2b1ca0e9792d9))
* **Tab Group:** [B2BDS-103] added logic for tab group ([017d162](https://github.com/otto-ec/b2b-design-system/commit/017d162ebbc9625e59fb7a12d7695743396eb39a))
* **Table:** [B2BDS-85] add dividers to headers and cells ([9ca4bbc](https://github.com/otto-ec/b2b-design-system/commit/9ca4bbc32f283145411320e2780799c306764f22))

# [1.2.0-beta.20](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.19...v1.2.0-beta.20) (2022-12-14)


### Bug Fixes

* **Checkbox:** [B2BDS-121] removed watch decorator to prevent external changes triggring validation ([2ad0b27](https://github.com/otto-ec/b2b-design-system/commit/2ad0b27bd71398ff6d729ceaa3512f7285181354))
* **Input:** fix font style for label and hints ([f2b962d](https://github.com/otto-ec/b2b-design-system/commit/f2b962dfacdd44df4778da7ab79099132bc4d0b9))
* **Input:** fix font-family for input text ([95d060b](https://github.com/otto-ec/b2b-design-system/commit/95d060b88e2f52eaf484530f529370dadd94c597))


### Features

* **Icon:** [B2BDS-136] \n\n BREAKING CHANGE: icon has it's own line height that can be customized ([7d6a846](https://github.com/otto-ec/b2b-design-system/commit/7d6a8465d50d878b82c925c068e3683dbd6c02d3))
* **Input and Icon:** added support for icon slot in input ([808ce1d](https://github.com/otto-ec/b2b-design-system/commit/808ce1da61da014347c9628cad2a5fd4e7d6684a))
* **Search:** [B2BDS-93] add search component without events ([490fcb3](https://github.com/otto-ec/b2b-design-system/commit/490fcb3de12f317dc3e3edf8a25f7d5c62f56c8d))
* **Search:** [B2BDS-93] component emits search event ([a8d9c27](https://github.com/otto-ec/b2b-design-system/commit/a8d9c27dffdd1d2da2e03b51383804376f40c5fd))
* **Search:** [B2BDS-93] extract options as a new component ([9e52763](https://github.com/otto-ec/b2b-design-system/commit/9e527635c2aea6ebca944b07b74106786b6f1a1d))
* **Search:** [B2BDS-93] fix interaction when selecting an option ([00b2d4d](https://github.com/otto-ec/b2b-design-system/commit/00b2d4d8ede23ad37c68a5032ca39a83f474eb69))
* **Search:** [B2BDS-93] implements search list and event for selected results ([4611760](https://github.com/otto-ec/b2b-design-system/commit/4611760457e59f7db5071eba813d2df5c350e839))
* **Search:** [B2BDS-93] make result box scrollable ([f51e856](https://github.com/otto-ec/b2b-design-system/commit/f51e856f78c33c1b133c3b990903df5874717172))
* **Separator:** [B2BDS-105] added separator component ([ad41403](https://github.com/otto-ec/b2b-design-system/commit/ad4140357f883166e04188b9076d60371fdeea3f))
* **Tab Component:** [B2BDS-117] added singular tab component ([aecb91b](https://github.com/otto-ec/b2b-design-system/commit/aecb91bb9e8e879d433cb5d7e905a0007c877275))
* **Tab Panel:** [B2BDS-117] added tab panel component ([7450693](https://github.com/otto-ec/b2b-design-system/commit/7450693cba3c9470579f245e81373672713c8328))
* **Tooltip:** [B2BDS-94] added tooltip component ([c6eb74f](https://github.com/otto-ec/b2b-design-system/commit/c6eb74f7ebf87f510557a458ba19f238c7caa288))

# [1.2.0-beta.19](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.18...v1.2.0-beta.19) (2022-10-26)


### Bug Fixes

* **Headline:** update headline 400 & 200 font sizes ([82a86e2](https://github.com/otto-ec/b2b-design-system/commit/82a86e25d6a940076549dcbe5468bb1e37ec5728))
* **Input:** [B2BDS-106] fix placeholder styles ([42dea36](https://github.com/otto-ec/b2b-design-system/commit/42dea36bb3c8d5968673f29045e0788fb965a1a2))
* **Spinner:** move animation inside shadow root ([1f036d6](https://github.com/otto-ec/b2b-design-system/commit/1f036d683a41ce54bb8735c466a430414a7beed1))
* **styles:** bundle components with font-face declaration ([7fae11a](https://github.com/otto-ec/b2b-design-system/commit/7fae11a275563769afd7145e1945bbbe8ec64a1a))
* **Table:** [B2BDS-83] replace enums for union types ([ffc272e](https://github.com/otto-ec/b2b-design-system/commit/ffc272e21d9246580d422ecdbd72e02a4e4df88a))
* **Textarea:** fixed wrong styles when invalid and disabled and added min-width ([a9968fb](https://github.com/otto-ec/b2b-design-system/commit/a9968fba1a4beebec372925dcbf207e0ebb6fe41))


### Features

* **Alert:** added alert component ([411075c](https://github.com/otto-ec/b2b-design-system/commit/411075c09879f172ee4c543272badc8d12ccaea9))
* **Anchor:** [B2BDS-107] added shadow DOM support for anchor ([83029d5](https://github.com/otto-ec/b2b-design-system/commit/83029d552301226a073bd70adeb2d96098def449))
* **Button:** [B2BDS-106] add support for form submission from shadow DOM ([dc6d537](https://github.com/otto-ec/b2b-design-system/commit/dc6d537e2244de215f925e22fceacd774da34b77))
* **Dropdown:** [B2BDS-106] implement shadow dom ([e591a48](https://github.com/otto-ec/b2b-design-system/commit/e591a48bab516c1b0a47764e739d5f192e9c57d5))
* **Input:** [B2BDS-106] implement shadow dom ([3842523](https://github.com/otto-ec/b2b-design-system/commit/38425232853bcde7f3e4a916cf6041fe70025915))
* **Paragraph:** [B2BDS-107] added shadow DOM support ([50f288a](https://github.com/otto-ec/b2b-design-system/commit/50f288a58e99c128851b4a8b3175c927d4444b42))
* **Spinner:** [B2BDS-107] added shadow DOM support ([5b0f858](https://github.com/otto-ec/b2b-design-system/commit/5b0f8582177249ebb5430f32c537ea92096c9fc8))
* support for dynamic templates in vue ([97081b1](https://github.com/otto-ec/b2b-design-system/commit/97081b1bc44542a71a9f98bcc01e8207c3941bdf))
* support for using dynamic registered templates ([27ae4c6](https://github.com/otto-ec/b2b-design-system/commit/27ae4c6df34a1362a9c753c3574e6d5e77c935b2))
* **Table:** [B2BDS-83] add aligment to cell api ([c4503ba](https://github.com/otto-ec/b2b-design-system/commit/c4503baf5e52d72e163d8b495e8d9e0a9784b249))
* **Table:** [B2BDS-83] adds wrap size table component ([0642199](https://github.com/otto-ec/b2b-design-system/commit/0642199c74ac3c0b74c810d11fdebfc5dad2536a))
* **Table:** [B2BDS-83] renames wrap to equal and adds expand size ([3e0f8bb](https://github.com/otto-ec/b2b-design-system/commit/3e0f8bbe5e099953b4aaadd147cfef8d68d88123))
* **Textarea:** [B2BDS-96] added max length prop to textarea ([a69ba8f](https://github.com/otto-ec/b2b-design-system/commit/a69ba8f0b68b7c4ae4c4ada4f324ebb8ebdde3a5))
* **Textarea:** [B2BDS-96] added textarea component ([8194e03](https://github.com/otto-ec/b2b-design-system/commit/8194e032e588f764f85b31851ec53fe03960eadf))

# [1.2.0-beta.18](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.17...v1.2.0-beta.18) (2022-09-20)


### Features

* **Button:** [B2BDS-104] added shadow DOM support for button ([dd0f00f](https://github.com/otto-ec/b2b-design-system/commit/dd0f00fa49e0bfbba21ac24d7f58041c6a67d1e3))
* **Checkbox Group:** [B2BDS-84] added indentation and horizontal alignment to checkbox group ([35d7998](https://github.com/otto-ec/b2b-design-system/commit/35d79984466102d8b523aaf1b8e58dd6d3fa5fbd))
* **Headline:** [B2BDS-104] added shadow dom support for headline ([c1cb737](https://github.com/otto-ec/b2b-design-system/commit/c1cb7370b25c252ef73083118d3d996ed5306cae))
* **Label:** [B2BDS-102] added label component, tokens and styles ([ea5ff69](https://github.com/otto-ec/b2b-design-system/commit/ea5ff69e28102de796c98ad68ff9e1e8f1c9682f))
* **Label:** [B2BDS-102] apply changes from sign off ([fead0f3](https://github.com/otto-ec/b2b-design-system/commit/fead0f3429ad39adf31b9c2f0ad8e98e5345b4a6))
* **Radio Button:** [B2BDS-84] added indentation for radio button ([76578ad](https://github.com/otto-ec/b2b-design-system/commit/76578ad2d340fb765a80335f4cdd782ca2c0d1fe))

# [1.2.0-beta.17](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.16...v1.2.0-beta.17) (2022-08-23)


### Bug Fixes

* **button:** fix loading indicator not appearing when dynamically changed ([349c084](https://github.com/otto-ec/b2b-design-system/commit/349c084ce548372938bc659496ddf4efef050e09))


### Features

* **Button:** added anchor support ([703a1b0](https://github.com/otto-ec/b2b-design-system/commit/703a1b0db46a86806a3b96f4758bcec7b7726ad3))
* dropdown singular option component ([8e24738](https://github.com/otto-ec/b2b-design-system/commit/8e24738c71678afb4274d78cfcd89ac06c859b0d))
* **tokens:** [B2BDS-62] add semantic tokens ([6d8e475](https://github.com/otto-ec/b2b-design-system/commit/6d8e475736f0da770776972931fa92d74194de44))
* **tokens:** [B2BDS-62] add support for dark theme concept ([1ba7560](https://github.com/otto-ec/b2b-design-system/commit/1ba7560bd4b9ce1a9de81cf9e7c4f32a1b80b312))
* **tokens:** [B2BDS-62] change coopy-75 line-height value as per design decision ([bb54fb4](https://github.com/otto-ec/b2b-design-system/commit/bb54fb41068c4b84f90309f9c205ad3c1892c766))
* **tokens:** [B2BDS-62] move styles to global and separate stencil dev build ([c18c9d3](https://github.com/otto-ec/b2b-design-system/commit/c18c9d36c2be5727845b05aa9e869ddfdbcf0a03))
* **tokens:** [B2BDS-62] refactor anchor component ([cd770ca](https://github.com/otto-ec/b2b-design-system/commit/cd770cadd3f5a0d51916091d170abbcf65aeb677))
* **tokens:** [B2BDS-62] refactor button component ([080fcfb](https://github.com/otto-ec/b2b-design-system/commit/080fcfb3b7e0354f33e2da1a160192280258d4da))
* **tokens:** [B2BDS-62] refactor checkbox and group components ([743e4cf](https://github.com/otto-ec/b2b-design-system/commit/743e4cf5ad13c828977b21467358cca782608c1c))
* **tokens:** [B2BDS-62] refactor examples styles and remove unsused tokens ([cf9af55](https://github.com/otto-ec/b2b-design-system/commit/cf9af55fdd88245c5fcdde38dee0da2997f0041a))
* **tokens:** [B2BDS-62] refactor headline component ([7d5655f](https://github.com/otto-ec/b2b-design-system/commit/7d5655f05d6fa68f3acb287c9f4ea6061bc04285))
* **tokens:** [B2BDS-62] refactor icon component ([9fa4236](https://github.com/otto-ec/b2b-design-system/commit/9fa4236e376482a83df1cf59828aa264eb768988))
* **tokens:** [B2BDS-62] refactor input component ([2545b6b](https://github.com/otto-ec/b2b-design-system/commit/2545b6b0cd1940c0756818c20c905fdc76ea730b))
* **tokens:** [B2BDS-62] refactor modal components ([d30b86f](https://github.com/otto-ec/b2b-design-system/commit/d30b86f4d345146c45759648737df3ebe3fbcd24))
* **tokens:** [B2BDS-62] refactor paragraph component ([b529e93](https://github.com/otto-ec/b2b-design-system/commit/b529e9316dfc91de2eaf3ac6d66b5e8799ca7bd9))
* **tokens:** [B2BDS-62] refactor radio & group components ([2ffb59e](https://github.com/otto-ec/b2b-design-system/commit/2ffb59eec8004200f2c77066c58b12fa5e5b947b))
* **tokens:** [B2BDS-62] remove base, semantic and typography from token names ([6336ae1](https://github.com/otto-ec/b2b-design-system/commit/6336ae164078a2b4ea610d9fff589c5b80cd2e2c))
* **tokens:** [B2BDS-62] rename old tokens to deprecated to avoid breaking new components ([2345be5](https://github.com/otto-ec/b2b-design-system/commit/2345be5aaa3408de711fcd8fc8c237f76ba6656c))
* **tokens:** [B2BDS-62] use copy tokens for font-size and line-height ([033355a](https://github.com/otto-ec/b2b-design-system/commit/033355a626b072c5f9f1f9624f7a2eaaab41dae8))

# [1.2.0-beta.16](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.15...v1.2.0-beta.16) (2022-08-10)


### Bug Fixes

* added missing font to radio group ([e928471](https://github.com/otto-ec/b2b-design-system/commit/e9284712a6d15bc665592f737128acfa7185cfe3))
* disabled and invalid state now behave correctly in checkbox and radio component ([5402ff8](https://github.com/otto-ec/b2b-design-system/commit/5402ff866cce1019654827a5d82d19a5e058634f))
* fixed disabled and error state bug in singular checkbox component ([72554d5](https://github.com/otto-ec/b2b-design-system/commit/72554d5857214b4806f3cd209f89ba28484e9c87))
* fixed dynamic import issue with vite ([e1b5a1d](https://github.com/otto-ec/b2b-design-system/commit/e1b5a1da06d49bc57c8a4f79a89aae4ff561cd7f))
* individual checkboxes or radio buttons will no longer have errors or hints when used in a group ([d0091d9](https://github.com/otto-ec/b2b-design-system/commit/d0091d969ddcb5852a7a5b0fc533f8d8bb083a23))
* **modal:** add missing attribute to modal heading ([b57d0bb](https://github.com/otto-ec/b2b-design-system/commit/b57d0bbe57ed22ccc641bd13fc6f52d2578d9981))
* **Spinner:** [B2BDS-70] Fix css for spinner animation ([e4bd1cd](https://github.com/otto-ec/b2b-design-system/commit/e4bd1cdfae7eab40e31db43094853f6575c0be28))
* styles from radio/checkbox components ([aa4392c](https://github.com/otto-ec/b2b-design-system/commit/aa4392c08397c3c3fac7272ee8ba24ed6acacd5c))
* workaround to fix missing css ([47f7241](https://github.com/otto-ec/b2b-design-system/commit/47f72414931b69a27bab319e3216ecf300636f22))


### Features

* added first draft of singular radio button ([28b0e79](https://github.com/otto-ec/b2b-design-system/commit/28b0e790f6e56c420a25a4c0961b78baf13f814d))
* **core:** [B2BDS-70] Add spinner component ([dc0810b](https://github.com/otto-ec/b2b-design-system/commit/dc0810bf4851dfc7d44ea85ec0d65441f9e2130f))
* poc for purging unused css ([9b0e745](https://github.com/otto-ec/b2b-design-system/commit/9b0e745aaea400d36ae2fa2709143d1bbf61fc47))
* singular radio component ([d3bd90c](https://github.com/otto-ec/b2b-design-system/commit/d3bd90c9b78e264824b8ecb91d7bd55f0281bcae))
* **Spinner:** [B2BDS-70] Add color option ([864be89](https://github.com/otto-ec/b2b-design-system/commit/864be8963753a5fadcc0660d8e13b27db568265b))
* **spinner:** [B2BDS-70] add secondary variant for contrast in grey ([92c54ce](https://github.com/otto-ec/b2b-design-system/commit/92c54cec82979d6beb8ce9734a63b9d2333c813d))
* **Spinner:** [B2BDS-70] Make spinner displayable inside of button ([ccc2327](https://github.com/otto-ec/b2b-design-system/commit/ccc232728aa8e1adff42c358ac2dfdc5be738e2f))
* support for dynamic source for purgecss ([85fb4a1](https://github.com/otto-ec/b2b-design-system/commit/85fb4a13424094687df15402e025f74d7570108b))
* support purging with shadow dom ([410b034](https://github.com/otto-ec/b2b-design-system/commit/410b034ad0e019fc0a85185e5fe35c4e92fea4fc))

# [1.2.0-beta.15](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.14...v1.2.0-beta.15) (2022-07-22)


### Bug Fixes

* added missing name attribute ([1db6e4a](https://github.com/otto-ec/b2b-design-system/commit/1db6e4a19e7df41c42667113cf770702f16a2ccb))
* **button:** [B2BDS-72] prevent click event propagation when disabled ([e1eb384](https://github.com/otto-ec/b2b-design-system/commit/e1eb384f804c7bec15bdd0f666e6088407abf246))
* **button:** [B2BDS-72] prevent click event propagation when loading ([7e4db00](https://github.com/otto-ec/b2b-design-system/commit/7e4db006189a6b2279aae94bcbd8e5db4947332b))
* changed all event names to kebap case to avoid issues with vue 3 ([15e87d6](https://github.com/otto-ec/b2b-design-system/commit/15e87d65bd34e791e8987801c6c781828d47db90))
* fixed linting error ([71d8f3c](https://github.com/otto-ec/b2b-design-system/commit/71d8f3c15c88874363bde0268f8b6d67e4be52d9))
* fixed linting error ([d71fabd](https://github.com/otto-ec/b2b-design-system/commit/d71fabd08433728d0c639d54465f1d2297e24854))
* fixed scss linting errors ([726fdf2](https://github.com/otto-ec/b2b-design-system/commit/726fdf22ee64cf4ba4a343640509b4571db4e7c6))
* removed empty scss file to push ([360f325](https://github.com/otto-ec/b2b-design-system/commit/360f325e2491be018d54c2d3a64759011f2faaa5))
* **tokens:** correct slight variation on grey-50 token ([c1439a5](https://github.com/otto-ec/b2b-design-system/commit/c1439a5161b1ff20b2c312e2ab66d5af77f98200))


### Features

* add margin to icon slots in button component ([4689726](https://github.com/otto-ec/b2b-design-system/commit/46897263676ffb8c058da804fa293b4b8cd5b480))
* add test for modal component ([103fce5](https://github.com/otto-ec/b2b-design-system/commit/103fce512a943070ea5d35bb1035b8ccfccaebae))
* add test for modal component ([54e6efa](https://github.com/otto-ec/b2b-design-system/commit/54e6efa13b65a14fe7e29e6bbc5aacceaaa51b84))
* added arrow-up and arrow-down icons ([a8aed2b](https://github.com/otto-ec/b2b-design-system/commit/a8aed2b650f287c9efe0182955a7936bedcc96df))
* added button type to available attributes, loading is no longer possible in disabled state ([56ab837](https://github.com/otto-ec/b2b-design-system/commit/56ab837255198f5991295aa39c63dfd7c7fc6b37))
* added button type to available attributes, loading is no longer possible in disabled state ([8b5946a](https://github.com/otto-ec/b2b-design-system/commit/8b5946a8a07362f24f3e92d7fdeabe03d30a2413))
* added checkbox component ([31f1ba6](https://github.com/otto-ec/b2b-design-system/commit/31f1ba6744b6b7cc22d54e46a1086bdca2dcee96))
* added checkbox component tokens ([f88983d](https://github.com/otto-ec/b2b-design-system/commit/f88983d33d548d0156347baa4b588fdb98b3d4a8))
* added checkbox styles ([24de5d0](https://github.com/otto-ec/b2b-design-system/commit/24de5d07675ef2958e30c0a0c40f6bbe28090428))
* added name attribute for accessibility and minor visual improvements ([480ed10](https://github.com/otto-ec/b2b-design-system/commit/480ed1050510573637e754975d25700af06376bf))
* **button:** change marging between icon and text ([f4ec0bf](https://github.com/otto-ec/b2b-design-system/commit/f4ec0bf0e5a11ef28438dacba6113edf4641c970))
* checkbox group component and styles ([5100a77](https://github.com/otto-ec/b2b-design-system/commit/5100a77526e5c0afd39364a0781fc7d360b018c5))
* **checkbox:** add disabled-selected styles and small improvements ([0e9edb5](https://github.com/otto-ec/b2b-design-system/commit/0e9edb5c14e2c945e8195e994dfb2062cd5ccf93))
* **icon:** gracefully fail if icon name does not exists ([999f770](https://github.com/otto-ec/b2b-design-system/commit/999f77086e66ca64106fbb83c957a889deb35db0))
* support for modal component ([8866b1f](https://github.com/otto-ec/b2b-design-system/commit/8866b1fcfabaae33e6dc95b33bc41440ab072d82)), closes [#B2BDS-63](https://github.com/otto-ec/b2b-design-system/issues/B2BDS-63)
* support for modal component ([8ff7537](https://github.com/otto-ec/b2b-design-system/commit/8ff7537aabe09bdecfc39b30b128234787109ef3)), closes [#B2BDS-63](https://github.com/otto-ec/b2b-design-system/issues/B2BDS-63)
* support for modal component ([ca22aea](https://github.com/otto-ec/b2b-design-system/commit/ca22aeacdfafab3929a478a00bff8ebd7d9cdad9)), closes [#B2BDS-63](https://github.com/otto-ec/b2b-design-system/issues/B2BDS-63)

# [1.2.0-beta.14](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.13...v1.2.0-beta.14) (2022-06-21)


### Bug Fixes

* adjusted vue example to reflect component changes ([d178103](https://github.com/otto-ec/b2b-design-system/commit/d178103a2f088b8f1ac99686fa1bce74a9952f67))
* fixed linting error ([dc31fa0](https://github.com/otto-ec/b2b-design-system/commit/dc31fa0a84f929df2e49b7c6483bccfff7a57873))
* fixed linting error ([b07f7d0](https://github.com/otto-ec/b2b-design-system/commit/b07f7d0cf4d443c36a4a87b340d581a77340b824))
* fixed linting error ([10bc817](https://github.com/otto-ec/b2b-design-system/commit/10bc8176ba862fdbdf3a4a51101092363da58000))


### Features

* add minor colour changes ([23dcb48](https://github.com/otto-ec/b2b-design-system/commit/23dcb482646fdbac2afa62f24c5ea1f940234ddc))
* added autofocus attribute ([dd98cac](https://github.com/otto-ec/b2b-design-system/commit/dd98cacbfcb4cc01d2b8577aa4ac03e505a4e9ad))
* added form submission and validation example in vue 3 app ([fa6ad7e](https://github.com/otto-ec/b2b-design-system/commit/fa6ad7e2780135a86ee902248e8290f866fa0b97))
* added React example for input validation and form submission ([351642f](https://github.com/otto-ec/b2b-design-system/commit/351642f9456ba880366a4f0c236d69463316fc11))
* added tokens for input component and lighter error red ([bb30dfa](https://github.com/otto-ec/b2b-design-system/commit/bb30dfa21a486b3acca1f6c5de5c2edd22fa6160))
* use state to handle error style changes ([c137a85](https://github.com/otto-ec/b2b-design-system/commit/c137a8507b980630a9afa33a85f4c4007510d99e))

# [1.2.0-beta.13](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.12...v1.2.0-beta.13) (2022-06-14)


### Bug Fixes

* include src in react-components distribution ([f0a4de2](https://github.com/otto-ec/b2b-design-system/commit/f0a4de2469db74cb3660e7b62e39482b8689b9a3))

# [1.2.0-beta.12](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.11...v1.2.0-beta.12) (2022-05-24)


### Features

* added anchor-related tokens ([c7c0803](https://github.com/otto-ec/b2b-design-system/commit/c7c08030f31453f170a63155551664f2d0866880))
* added hover color for anchor ([d243496](https://github.com/otto-ec/b2b-design-system/commit/d24349637cfbde2a3d633d5312cc50300bb2fcb3))
* added tsx for anchor component ([b4fca7d](https://github.com/otto-ec/b2b-design-system/commit/b4fca7d09f5635ed6da9942a9ebd63e94b05b36a))

# [1.2.0-beta.11](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.10...v1.2.0-beta.11) (2022-05-24)


### Bug Fixes

* fix button hover color ([46d8c7f](https://github.com/otto-ec/b2b-design-system/commit/46d8c7f526999f526097a0dfd153b401a5357893))
* fixed indentation ([b1f2bc4](https://github.com/otto-ec/b2b-design-system/commit/b1f2bc4739b91a598789e2488518075f4f574831))


### Features

* added autogeneration of iconname type from available icons ([9184166](https://github.com/otto-ec/b2b-design-system/commit/9184166c70ce793b125a2a20dcdbd560820b24db))
* added env config to source assets differently in dev ([675f2e9](https://github.com/otto-ec/b2b-design-system/commit/675f2e97fc21e97882217b57c0bbcab3cc9122d8))
* added tokens for icon component ([3412e2a](https://github.com/otto-ec/b2b-design-system/commit/3412e2a979d8a8aba1722b7b40ff676e77302f56))
* changed requests to include full svgs to avoid scaling issues and added size variations ([f376010](https://github.com/otto-ec/b2b-design-system/commit/f37601098eabd15eb472abb8adcbee7a9ffe4f26))
* script that converts static svg assets into lightweight json and fetches it for icon component ([53e42d0](https://github.com/otto-ec/b2b-design-system/commit/53e42d075d265e9cda501d6c123bd933f24d9b01))

# [1.2.0-beta.10](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.9...v1.2.0-beta.10) (2022-05-24)


### Features

* [B2BDS-46] add headline component ([52d20fd](https://github.com/otto-ec/b2b-design-system/commit/52d20fdba301e644cadd91d39f73b4a6f181ccac))
* [B2BDS-46] add margins as per current pali styles ([529fc81](https://github.com/otto-ec/b2b-design-system/commit/529fc8196233ad79fe0796a010c829003398348b))

# [1.2.0-beta.9](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.8...v1.2.0-beta.9) (2022-05-19)


### Bug Fixes

* fix button hover color ([9a018ed](https://github.com/otto-ec/b2b-design-system/commit/9a018ed338c0d15d1d52143a0a528baffd6b0414))

# [1.2.0-beta.8](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.7...v1.2.0-beta.8) (2022-05-09)


### Features

* add latest changes to button component ([b6e4b65](https://github.com/otto-ec/b2b-design-system/commit/b6e4b65d4ded2fa9d883bae76ba65406c086d3bd))

# [1.2.0-beta.7](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.6...v1.2.0-beta.7) (2022-05-05)


### Features

* changes button state api to only loading ([4e5f49d](https://github.com/otto-ec/b2b-design-system/commit/4e5f49d1921588372e2f9ee7478f67296f8d806e))

# [1.2.0-beta.6](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.5...v1.2.0-beta.6) (2022-05-05)


### Bug Fixes

* **core:** [B2BDS-47] Define sort order in documentation ([d1f035c](https://github.com/otto-ec/b2b-design-system/commit/d1f035c8de2cf77477d91aefac30210406d1fe11))

# [1.2.0-beta.5](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.4...v1.2.0-beta.5) (2022-05-05)


### Bug Fixes

* **core:** fix fonts ([fc5256d](https://github.com/otto-ec/b2b-design-system/commit/fc5256de252f8c6cedc56496f220f75ac9ace92e))

# [1.2.0-beta.4](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.3...v1.2.0-beta.4) (2022-04-29)


### Features

* **core:** add paragraph component ([8605980](https://github.com/otto-ec/b2b-design-system/commit/86059807710ad97e6f484d43ba38572ab1ee9abc))

# [1.2.0-beta.3](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.2...v1.2.0-beta.3) (2022-04-29)


### Bug Fixes

* **examples:** use latest b2b-button attributes ([70a4339](https://github.com/otto-ec/b2b-design-system/commit/70a43390cdd04d36cdd04c765a4c39757951b95f))

# [1.2.0-beta.2](https://github.com/otto-ec/b2b-design-system/compare/v1.2.0-beta.1...v1.2.0-beta.2) (2022-04-14)


### Bug Fixes

* change hover color of secondary button ([dd1f9f4](https://github.com/otto-ec/b2b-design-system/commit/dd1f9f4b4aa871b848a7a0948d361dfa244169d1))
* fixed linting issue ([8557588](https://github.com/otto-ec/b2b-design-system/commit/85575885d977f9ee93a65e18195b23cd2f931b7d))
* fixed linting issues hopefully ([99e165f](https://github.com/otto-ec/b2b-design-system/commit/99e165ffec9a1a9866d84c5d006b458090113fc1))
* fixed linting issues hopefully for real ([393b08d](https://github.com/otto-ec/b2b-design-system/commit/393b08d2621a3e9c862814c5dca6dd15fa812e98))
* fixed linting issues hopefully now ([bf30d11](https://github.com/otto-ec/b2b-design-system/commit/bf30d1169f755c12edbabf5de42abb2f89ea06df))
* fixed unit tests again ([eb6313d](https://github.com/otto-ec/b2b-design-system/commit/eb6313d4f8458ccfedb3ff46db10a0c398616a45))
* fixed unit tests to check updated values ([4c3f513](https://github.com/otto-ec/b2b-design-system/commit/4c3f513359e237bd18fb4f5be50be5273e81bc9d))
* merge remote changes ([0c53ed4](https://github.com/otto-ec/b2b-design-system/commit/0c53ed42112337a9e78a17fde52bd925234ef1f5))


### Features

* added disabled behavior and fixed unit tests ([794e651](https://github.com/otto-ec/b2b-design-system/commit/794e651fc1575d1fdbccf8974c105adebe8c4f71))
* added new default variant and loading spinner ([528b5ee](https://github.com/otto-ec/b2b-design-system/commit/528b5eebc99d87b909ed61067f6d94abd75a2ede))
* fixed tokens to adhere to current button styles ([c701b92](https://github.com/otto-ec/b2b-design-system/commit/c701b92e5aef8cb19850a04f5ce421bc4fe9fe33))

# [1.2.0-beta.1](https://github.com/otto-ec/b2b-design-system/compare/v1.1.1...v1.2.0-beta.1) (2022-04-06)


### Bug Fixes

* change hover color of secondary button ([9cc3a4c](https://github.com/otto-ec/b2b-design-system/commit/9cc3a4c801224873d002a2f6bea13d198ee6f930))
* fixed linting issue ([363b6f3](https://github.com/otto-ec/b2b-design-system/commit/363b6f316f2405dc7e965773c33237aaa71cd19d))
* fixed linting issues hopefully ([d32fc42](https://github.com/otto-ec/b2b-design-system/commit/d32fc42468178fc173b1845d218fdc7f6fb08e8a))
* fixed linting issues hopefully for real ([31a49bc](https://github.com/otto-ec/b2b-design-system/commit/31a49bceabf70cdeb4c0693366eb52011e44b4ce))
* fixed linting issues hopefully now ([e5c8c82](https://github.com/otto-ec/b2b-design-system/commit/e5c8c8283c03fa6f9c4975323760e492e4e43ca1))


### Features

* added disabled behavior and fixed unit tests ([83aec83](https://github.com/otto-ec/b2b-design-system/commit/83aec8353f87624a0132e32955002ebbe1d34a13))
* added new default variant and loading spinner ([dfc7f4f](https://github.com/otto-ec/b2b-design-system/commit/dfc7f4f669dfa7a6d01d37067cf81641dac13ffc))
* fixed tokens to adhere to current button styles ([63d6b36](https://github.com/otto-ec/b2b-design-system/commit/63d6b363bdb94a522eee6f31c1aaee9c49329a49))

## [1.1.1](https://github.com/otto-ec/b2b-design-system/compare/v1.1.0...v1.1.1) (2022-03-25)


### Bug Fixes

* move publish command to release.config ([18341d0](https://github.com/otto-ec/b2b-design-system/commit/18341d0ff11a4409adc6036abcdb1c84efc096c2))

# [1.1.0](https://github.com/otto-ec/b2b-design-system/compare/v1.0.1...v1.1.0) (2022-03-25)


### Bug Fixes

* add packages.json files to commit changes after release ([eff33ee](https://github.com/otto-ec/b2b-design-system/commit/eff33ee70ca7cc359929a404033f9ad4a385b855))
* add path argument to release script run ([d137e16](https://github.com/otto-ec/b2b-design-system/commit/d137e1648986fe980224735e6c9f21bf92676cc7))
* add path argument to release script run ([2beae47](https://github.com/otto-ec/b2b-design-system/commit/2beae470416ea84cb6755ed1953116a93b0b45eb))
* add release config to all packages to automate dependency bump ([b11f8de](https://github.com/otto-ec/b2b-design-system/commit/b11f8de4e8c7fa5abbbe985ba504f40511623dae))
* add script to update version of core in other packages ([6142c5b](https://github.com/otto-ec/b2b-design-system/commit/6142c5b0e60ca081c0517815375ed7ce06a68dc3))
* added secret for pipeline ([174448d](https://github.com/otto-ec/b2b-design-system/commit/174448dd3da55ba3f9573fba240201d4e39d84b0))
* added secret for pipeline ([3d5d043](https://github.com/otto-ec/b2b-design-system/commit/3d5d04338e96d63c28f15115d15be051bccfd40f))
* added secret to correct step in the workflow ([384a2f6](https://github.com/otto-ec/b2b-design-system/commit/384a2f64d4ff3a4ee104dd82e13f8ac6b1d3801a))
* another try at automated tokene auth ([deb4109](https://github.com/otto-ec/b2b-design-system/commit/deb4109de5a6a3ff1900c804da5ed0a926dfd3bc))
* another try of publishing right release ([c3f7793](https://github.com/otto-ec/b2b-design-system/commit/c3f7793ba781a35541461372466f9b514733c2ed))
* another try to avoid running a release ([1dba310](https://github.com/otto-ec/b2b-design-system/commit/1dba3104cd85d930a6d2755427823cd3b15aff48))
* another try to fix the pipeline ([8cae07a](https://github.com/otto-ec/b2b-design-system/commit/8cae07a0dda203b4fffbc74812a436eb94c22854))
* another try to fix the pipeline ([55cf988](https://github.com/otto-ec/b2b-design-system/commit/55cf9882fd6450615f70e077c42cd09f835bdc75))
* audit fix ([40a7e7d](https://github.com/otto-ec/b2b-design-system/commit/40a7e7ddb6f291be0337a08592b7b062cf77ac66))
* change release file extension so that tool uses config file ([817fdfd](https://github.com/otto-ec/b2b-design-system/commit/817fdfd96d538ce15a966d5f185bd8da874dfb6f))
* changed the token permissions ([165396b](https://github.com/otto-ec/b2b-design-system/commit/165396b49fa63b595647d286b577bad38e83c83c))
* changed version requirement for tokens to fix pipeline ([f480545](https://github.com/otto-ec/b2b-design-system/commit/f4805456266648922dbfabf97df12286b828c02e))
* fix tokens version ([a60ebfc](https://github.com/otto-ec/b2b-design-system/commit/a60ebfcd57cceba746bc656418a09989d8059720))
* hopefully fixed pipeline ([05f6d77](https://github.com/otto-ec/b2b-design-system/commit/05f6d77987e7508dbb8da7ebefc12fd9db9a15a1))
* lets try again ([2ab3538](https://github.com/otto-ec/b2b-design-system/commit/2ab3538b120c8fe6444c5d6b73e9bbc29b06db82))
* manually upgrade package dependencies ([b2454d5](https://github.com/otto-ec/b2b-design-system/commit/b2454d584e29272fd80846600c103a68edd00b76))
* remove release step from packages ([5fa7c8a](https://github.com/otto-ec/b2b-design-system/commit/5fa7c8ab44f37fed75c39a3b9a72a02325fba46a))
* separated steps ([7adc6df](https://github.com/otto-ec/b2b-design-system/commit/7adc6df5f0a5afdbb0e0c858bb9dd639c2e7427b))
* test realising all packages ([01b45f8](https://github.com/otto-ec/b2b-design-system/commit/01b45f89c03142cbcf3698eaf56ef0d14f3aa6e7))
* test update dependency version after release ([7f668a0](https://github.com/otto-ec/b2b-design-system/commit/7f668a0398b665059e0c9485cf4b0c13f4d0070a))
* test without hydrate pkg ([ff73579](https://github.com/otto-ec/b2b-design-system/commit/ff73579d7bb802d147475b8751c5ffa31d43e717))
* update dependencies manually ([bbc6b05](https://github.com/otto-ec/b2b-design-system/commit/bbc6b05cb97b3c920efb559b01a21966204616f5))
* update dependencies to fix vulnerabilities ([e845021](https://github.com/otto-ec/b2b-design-system/commit/e845021a90bd0d1e4439d1d1e29fc0fb304f5847))
* update package.lock for security vulnerabilities ([9ddb7e6](https://github.com/otto-ec/b2b-design-system/commit/9ddb7e60fe4d87277b9177869e996cc05f47fdc2))
* updated package files ([6d22dd5](https://github.com/otto-ec/b2b-design-system/commit/6d22dd5576ad0c2919bac9869267576ab83b9a80))
* upgrade minimist dependency for vulnerability ([4f5a2e6](https://github.com/otto-ec/b2b-design-system/commit/4f5a2e63ccf4336b29eefcd36e2445a704b47a99))


### Features

* added hydrate app for SSR support and next example ([e2057ee](https://github.com/otto-ec/b2b-design-system/commit/e2057ee6703bae943a12fdcf29a07d029e27eee9))
* added react-components package publishing process ([7c53c82](https://github.com/otto-ec/b2b-design-system/commit/7c53c824315fb13e0f03079e9b13b5a4e6707827))
* test rule to release only with changes in specific package ([f853b73](https://github.com/otto-ec/b2b-design-system/commit/f853b7348b2b9f9d8ed2e743901fea52e87b1e00))


### Reverts

* Revert "chore(release): 1.1.0 [skip ci]" ([6572a5f](https://github.com/otto-ec/b2b-design-system/commit/6572a5ffe04ab2810afbe3bc3aa1404c0cc8a2da))
* Revert "chore(release): 1.1.0 [skip ci]" ([3f35e16](https://github.com/otto-ec/b2b-design-system/commit/3f35e164097cfc57df5ac84bfca307d47aabfea6))
* Revert "chore(release): 1.1.0 [skip ci]" ([6f10daa](https://github.com/otto-ec/b2b-design-system/commit/6f10daacfb1c97c09edb14e707c6752edf0f2ab7))
* Revert "chore(release): 1.1.0 [skip ci]" ([06aa0f7](https://github.com/otto-ec/b2b-design-system/commit/06aa0f7933387aeed6bd08345850fcca6afed09b))
