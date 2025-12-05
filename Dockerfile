FROM node:22-alpine

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

# Install http-serve into a separate prefix and then remove global npm
RUN mkdir -p /opt/http-serve \
    && npm install --omit=dev http-serve --prefix /opt/http-serve \
    && rm -rf /usr/local/lib/node_modules/npm

# Run http-serve directly from the prefixed install
CMD ["/opt/http-serve/node_modules/.bin/http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
