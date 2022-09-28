FROM node:14.19.3
WORKDIR /app
ARG ENV
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install --network-timeout 100000
RUN yarn run build:$ENV
CMD ["yarn", "start"]