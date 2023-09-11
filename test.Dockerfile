# Use playwright image as a base
FROM mcr.microsoft.com/playwright:v1.34.0-jammy as playwright

# Set the working directory inside the container
WORKDIR /b2b


COPY . .

RUN npm uninstall puppeteer


WORKDIR /b2b/packages/core-components
RUN npm install

# Install top-level dependencies
WORKDIR /b2b
RUN npm install

RUN npx playwright install