FROM node:24-alpine3.23

# Pull latest Alpine security fixes for OpenSSL (libcrypto3/libssl3)
RUN apk upgrade --no-cache libcrypto3 libssl3

# Upgrade undici to fix CVE-2026-19534 (undici: undici: Denial of Service via unrequested WebSocket subprotocol)
RUN npm install -g undici@8.10.2 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/undici \
  && cp -r /usr/local/lib/node_modules/undici /usr/local/lib/node_modules/npm/node_modules/undici

# Upgrade tar to fix CVE-2026-59873 (node-tar DoS via gzip bomb) and CVE-2026-59874 (node-tar DoS via malformed header)
RUN npm install -g tar@7.5.21 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/tar \
  && cp -r /usr/local/lib/node_modules/tar /usr/local/lib/node_modules/npm/node_modules/tar \
  && npm uninstall -g tar

# Upgrade brace-expansion to fix CVE-2026-102278 (brace-expansion DoS vulnerability)
RUN npm install -g brace-expansion@5.0.11 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && cp -r /usr/local/lib/node_modules/brace-expansion /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && npm uninstall -g brace-expansion

# Upgrade ip-address to fix CVE-2026-69192 (ip-address Inconsistent IP address parsing leads to Server-Side Request Forgery (SSRF))
RUN npm install -g ip-address@10.3.1 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/ip-address \
  && cp -r /usr/local/lib/node_modules/ip-address /usr/local/lib/node_modules/npm/node_modules/ip-address \
  && npm uninstall -g ip-address

# Upgrade http-cache-semantics to fix CVE-2026-93748 (Information Disclosure via max-stale directive)
RUN npm install -g http-cache-semantics@4.3.0 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/http-cache-semantics \
  && cp -r /usr/local/lib/node_modules/http-cache-semantics /usr/local/lib/node_modules/npm/node_modules/http-cache-semantics \
  && npm uninstall -g http-cache-semantics

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
