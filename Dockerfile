FROM node:24-alpine3.23

RUN apk add --upgrade zlib

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
