# Build Angular
FROM node:23 AS ng-build

WORKDIR /src

RUN npm i -g @angular/cli

COPY public public
COPY src src
COPY *.json .

RUN npm ci && ng build

FROM caddy:2-alpine

COPY --from=ng-build /src/dist/day32 /srv
COPY Caddyfile ./Caddyfile

ENV PORT=8080
EXPOSE 8080

SHELL [ "/bin/sh", "-c" ]
ENTRYPOINT caddy run --config ./Caddyfile