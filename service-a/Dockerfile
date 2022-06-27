FROM node:16.13.0-alpine as build-env

# Create and use a specific directory for the app
ENV ROOT_DIR /service

WORKDIR ${ROOT_DIR}

COPY . .
RUN NODE_ENV=development npm install --frozen-lockfile

EXPOSE 4000

CMD ["npm", "start"]
