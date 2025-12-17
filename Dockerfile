FROM node:22-alpine
COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "serve@14.2.4", "/tmp", "-l", "80", "--cors"]
