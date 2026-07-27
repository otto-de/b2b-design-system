FROM node:24-alpine3.23

# Upgrade undici to fix CVE-2026-12151 (undici DoS vulnerability)
RUN npm install -g undici@8.5.0 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/undici \
  && cp -r /usr/local/lib/node_modules/undici /usr/local/lib/node_modules/npm/node_modules/undici

# Upgrade brace-expansion to fix CVE-2026-14257 (brace-expansion DoS vulnerability)
RUN npm install -g brace-expansion@5.0.8 \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && cp -r /usr/local/lib/node_modules/brace-expansion /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && npm uninstall -g brace-expansion

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
