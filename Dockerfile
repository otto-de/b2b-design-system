FROM node:24-alpine3.23

# Upgrade npm to version and patch picomatch
RUN npm install -g npm@latest \
  && npm install -g picomatch@4.0.4 \
  && npm cache clean --force \
  && find /usr/local/lib/node_modules/npm -path "*/tinyglobby/node_modules/picomatch" -type d -exec rm -rf {} + 2>/dev/null || true \
  && mkdir -p /usr/local/lib/node_modules/npm/node_modules/tinyglobby/node_modules/picomatch \
  && cp -r /usr/local/lib/node_modules/picomatch/* /usr/local/lib/node_modules/npm/node_modules/tinyglobby/node_modules/picomatch/ 2>/dev/null || true \
  && npm uninstall -g picomatch 

RUN apk add --upgrade zlib

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
