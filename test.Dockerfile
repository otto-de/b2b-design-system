# Use playwright image as a base

FROM mcr.microsoft.com/playwright:v1.53.1-jammy AS playwright


WORKDIR /b2b


COPY ./packages /b2b/packages
COPY ./package.json /b2b/package.json
COPY ./scripts /b2b/scripts
COPY ./DEV-GUIDELINES.md /b2b
COPY ./CHANGELOG.md /b2b


# Install chromium-browser
RUN apt-get update && \
    apt-get install -y chromium-browser && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*



WORKDIR /b2b
RUN npm i --verbose

WORKDIR /b2b/packages/core-components
