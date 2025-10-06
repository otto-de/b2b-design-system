## Usage

### Build

Whenever you make changes to a component or create a new one, you need to rebuild the storybook image
to include possible differences to test existing screenshots against. To build, run:

`docker-compose up --build` 

This rebuilds the storybook and test-runner services to include recent changes and run the tests against them.

### Update Snapshots

If there is a new component, simply rebuilding starting the services is enough as the normal entrypoint automatically adds new screenshots.
However, if you made intended visual changes to an existing component, you will need to run: 

`docker-compose run run-tests npx test-storybook --verbose --url http://storybook.local:6006 -u`

to override the default command and update the snapshots.