FROM node:10

ADD . .
LABEL Description="frontendmodrp"
RUN yarn install
CMD [ "yarn", "start" ]
EXPOSE 3000
