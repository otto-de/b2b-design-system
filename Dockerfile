FROM node:22-alpine

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

RUN npm init -y >/dev/null 2>&1 && \
    npm install --omit=dev http-serve && \
    rm -rf /usr/local/lib/node_modules/npm

CMD ["./node_modules/.bin/http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
