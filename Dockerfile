FROM node:latest AS cache
RUN mkdir /src
WORKDIR /src
COPY ./package.json /src
RUN npm install
RUN npm install gulp

FROM node:latest AS build
WORKDIR /src
COPY --from=cache /src/node_modules /src/node_modules
#COPY  ./package.json /src
#RUN npm install
COPY . /src
RUN echo 'testing phase'
#RUN node node_modules/gulp/bin/gulp test

FROM node:latest AS deploy
WORKDIR /src
COPY . /src
COPY --from=cache /src/node_modules /src/node_modules
EXPOSE 3000
CMD ["npm", "start"]
