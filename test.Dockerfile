FROM mcr.microsoft.com/playwright:v1.22.0-focal as playwright
WORKDIR /b2b/packages/core-components
ENTRYPOINT ["npx", "test-storybook", "--verbose", "--url", "http://host.docker.internal:6006"]
#CMD npx test-storybook --url http://host.docker.internal:6006
