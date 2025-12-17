FROM node:22-alpine AS app

# Remove vulnerable npm and install clean version with serve
RUN rm -rf /usr/local/lib/node_modules/npm && \
    apk add --no-cache npm && \
    npm install -g serve@^14.2.5 && \
    adduser -Ds /bin/bash b2b-design-system

COPY packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html

USER b2b-design-system
WORKDIR /opt/app

ENV NODE_ENV=production

CMD ["serve", "/tmp", "-l", "80", "--cors"]
