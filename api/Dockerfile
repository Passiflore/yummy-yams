FROM node:lts-alpine

WORKDIR /usr/src/api

ENV NODE_ENV developpement

COPY package.json .
COPY package-lock.json .

RUN corepack enable pnpm
RUN corepack use pnpm@latest
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "run", "dev"]