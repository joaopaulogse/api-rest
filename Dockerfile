FROM ubuntu:latest

MAINTAINER PROJETO-API

RUN apt-get update && apt-get install nodejs-legacy npm -y
RUN npm install -g yarn

EXPOSE 3000

RUN apt-get install curl -y
RUN npm install -g n
RUN n stable

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

