FROM node:24-alpine3.23

# Update npm to latest version to fix security vulnerabilities in npm's dependencies
RUN npm install -g npm@latest

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
