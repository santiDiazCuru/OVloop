FROM node:10-alpine
WORKDIR /app
COPY ./back/index.js /app/index.js
COPY ./back/package.json /app/package.json

#WORKDIR /app/client
#RUN ["npm", "install"]
#RUN ["npm", "run", "build"]


WORKDIR /app
RUN ["npm", "install"]
EXPOSE 8080
ENTRYPOINT ["npm", "start"]