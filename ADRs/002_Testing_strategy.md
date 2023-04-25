# 002. Testing strategy

## 2.1 Visual Regression Tests

Date: 18.02.2022

### Status

accepted

### Context

With visual regression tests we want to be able to capture unintentional changes to the visual style of our components.
Ideally we will implement this tests during the component creation so that they serve as regression tests that will  
avoid future unintentional changes.

We have decided and implemented option 4, see [details below](#4-storybook-test-runner-with-playwright)

### Options

#### 1. Snapshot testing

Snapshot tests produce a render output which is a readable tree structure of the html and class names. This tests will
fail when this structure changes, suggesting possible unintentional errors introduced in new work.

Pros: These tests are very easy to implement and cheap to run, as we are not really rendering or capturing user input.

Cons: Because the html structure and css class naming (implementation details) are very prone to change, it could become
a drawback that the snapshot will fail even though the component still looks the same. Down the road generally
developers just stop trusting the test actually fails and just update the snapshot without checking the changes.

#### 2. Screenshot testing

Screenshot testing works similarly to snapshot testing in the sense that it will take an initial screenshot of the
component, and test every next iteration against this screenshot by comparing actual visual changes.

Pros: Does not test implementation, but a visual comparison to a screenshot. This gives developers more freedom to
modify the architecture of a component without failing visual tests unnecessarily.

Cons: They require a bit more infrastructure set up at the beginning if we would like to keep the failing screenshots
when running on the pipeline.

#### 3. Screenshot testing all platforms (Stencil, Vue, React)

Running screenshot testing with tools like Pupeteer could allow us to test in different running applications at the same
time.

Pros: This could help guarantee that we don't break anything specific to a platform.

Cons: This implies that we will have to have examples of all the components in Vue and React applications to be able to
test them. This could become costly. We don't really know how likely is that the styles will break in different
platforms. Chances are that won't happen. So this could be a good option if later down the road we find this use case
happening often to justify the investment.

#### 4. Storybook test runner with Playwright

With the Storybook test runner we can automate testing by taking screenshots of all our stories. This uses also 
jest-image-snapshot. With this option if we need to write behaviour test we can do it in the play function from 
storybook. 

## Decision

We won't do testing in all platforms as examples will be hard to maintain. We decided to use Storybook Test Runner to 
run only visual regression with jest-image-snapshot.

### How it works

The Storybook test runner will run on every story going through it's lifecycle that includes calling the play 
function and hook methods like preRender() and posRender(). We are using the posRender() hook to run our screenshot 
comparison using the tool jest-image-snapshot. This function is defined in the test-runner.ts file. inside the
.storybook folder.

You can find more details about the test-runner lifecycle in [this link](https://github.com/storybookjs/test-runner#render-lifecycle).

### Challenges: 

1. When rendering our components, no matter the tool we use, the fonts will be rendered differently 
depending on the OS, so we will always have failing tests depending if we run on Mac, Windows or Linux. To tackle 
this we are running locally in a docker ubuntu machine that is also used in our GitHub actions. With this fix we 
were able to produce the same results both locally and in the CI. If more discrepancies start appearing in the 
future, it would be good to consider running the docker container also in the CI.

2. Tests can be flaky when the component depends on a network response, this could include fonts and assets like 
   icons. To counter this we are running a jest.retry() function in the test-runner so that when something fails it 
   will try again. This is not an optimal solution as it will retry as well when there is an actual failure, 
   but it was the only thing we found at the time that will remove the flakiness. We did try the page.waitForLoadState('networkidle') from Playwright but this was still causing random failures, and it [is considered 
   not reliable](https://github.com/microsoft/playwright/issues/4664#issuecomment-742691215) in the by Playwright contributors.


## Consequences

We are more likely to catch up unwanted visual style changes when modifying components in the future. Specially when 
we commit changes in design tokens. 
This is an advantage as well for a collaborative model where many developers could contribute to this project.

## Future improvements
- We can figure out a way to pre-load fonts and assets so that we can remove the retry step from jest and improve 
performance in the tests.
- Test are running very slow, might be due to the failure retries and the .waitForLoad() call. We can further 
  investigate why they are slow.  
- Playwright is able to run against other browsers, not only Chromium. This config requires to --eject storybook test 
  runner, and can be explored in the future.

## Links

[Storybook test runner](https://github.com/storybookjs/test-runner)

[Jest image snapshot]([https://github.com/americanexpress/jest-image-snapshot])

[Why implement Visual regression tests](https://sparkbox.com/foundry/design_system_visual_regression_testing)

[Snapshot testing](https://jestjs.io/docs/snapshot-testing#:~:text=Snapshot%20tests%20are%20a%20very,file%20stored%20alongside%20the%20test.)
