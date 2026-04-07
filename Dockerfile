FROM node:24-alpine3.23

# Fix CVEs in npm-bundled packages (minimatch, picomatch, tar)
RUN cd /usr/local/lib/node_modules/npm \
  && npm install \
    minimatch@10.2.3 \
    picomatch@4.0.4 \
    tar@7.5.11 \
  && npm cache clean --force

RUN apk add --upgrade zlib

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
