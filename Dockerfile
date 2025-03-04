# Build Angular
FROM node:23 AS ng-build

WORKDIR /src

RUN npm i -g @angular/cli

COPY public public
COPY src src
COPY *.json .

RUN npm ci && ng build

FROM caddy:latest

COPY --from=ng-build /src/dist/day32 /srv

EXPOSE 80