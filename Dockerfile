FROM node:22.4.1-alpine
RUN apk update && apk add --no-cache bash
CMD bash