FROM node:14.19.3
WORKDIR /app
ARG ENV
ENV ENV=$ENV
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install --network-timeout 100000
CMD ["yarn", "start:$ENV"]
