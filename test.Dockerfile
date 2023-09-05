FROM mcr.microsoft.com/playwright:v1.34.0-jammy as playwright
WORKDIR /b2b/packages/core-components
COPY ./packages/core-components/package.json /b2b/packages/core-components
RUN npm install
ENTRYPOINT ["npx", "test-storybook", "--verbose", "--url", "http://host.docker.internal:6006"]
#CMD npx test-storybook --url http://host.docker.internal:6006
