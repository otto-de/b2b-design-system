FROM node:22-alpine

RUN npm install -g npm@latest && \
    npm install -g http-server@14.1.1

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

ENV NODE_ENV=production

CMD ["http-server", "/tmp", "-p", "80", "--cors"]
