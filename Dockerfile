FROM node:10-alpine
WORKDIR /app
COPY . .

#WORKDIR /app/client
#RUN ["npm", "install"]
#RUN ["npm", "run", "build"]


WORKDIR /app/back
RUN ["npm", "install"]
EXPOSE 8080
ENTRYPOINT ["npm", "start"]