FROM node:24-alpine3.23

# Remove npm binary and its vulnerable dependencies since we only need npx
RUN rm -rf /usr/local/lib/node_modules/npm

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
