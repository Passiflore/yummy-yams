FROM node:lts-alpine

WORKDIR /usr/src//app

ENV NODE_ENV developpement

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable pnpm
RUN corepack use pnpm@latest
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "run", "dev"]