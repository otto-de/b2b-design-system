FROM node:24-alpine3.23

# Upgrade npm to version and patch picomatch
RUN npm install -g npm@latest \
  && npm install -g picomatch@4.0.4 \
  && npm cache clean --force \
  && find /usr/local/lib/node_modules/npm -path "*/tinyglobby/node_modules/picomatch" -type d -exec rm -rf {} + 2>/dev/null || true \
  && mkdir -p /usr/local/lib/node_modules/npm/node_modules/tinyglobby/node_modules/picomatch \
  && cp -r /usr/local/lib/node_modules/picomatch/* /usr/local/lib/node_modules/npm/node_modules/tinyglobby/node_modules/picomatch/ 2>/dev/null || true \
  && npm uninstall -g picomatch 

# Upgrade undici to fix CVE-2026-12151 (undici DoS vulnerability)
RUN npm install -g undici@8.5.0 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/undici \
  && cp -r /usr/local/lib/node_modules/undici /usr/local/lib/node_modules/npm/node_modules/undici

# Upgrade brace-expansion to fix CVE-2026-14257 (brace-expansion DoS vulnerability)
RUN npm install -g brace-expansion@5.0.8 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && cp -r /usr/local/lib/node_modules/brace-expansion /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && npm uninstall -g brace-expansion

# Upgrade tar to fix CVE-2026-59873 (CRITICAL) and CVE-2026-59874 (HIGH)
RUN npm install -g tar@7.5.22 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/tar \
  && cp -r /usr/local/lib/node_modules/tar /usr/local/lib/node_modules/npm/node_modules/tar \
  && npm uninstall -g tar

RUN apk add --upgrade zlib libcrypto3 libssl3

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
