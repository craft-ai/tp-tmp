const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const SERVER_PORT = parseInt(process.env.SERVER_PORT ?? 4000);

function createDBPool({ user, password, host, port, database, maxConnections }) {
  return new Pool({
    user,
    password,
    host,
    port: port ?? 5432,
    database,
    max: maxConnections ?? 10,
  });
}

const dbSettings = {
  user: process.env.POSTGRES_DATABASE_USER ?? 'myuser',
  password: process.env.POSTGRES_DATABASE_PWD ?? 'mypassword',
  host: process.env.POSTGRES_DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_DATABASE_PORT ?? '5433'),
  database: process.env.POSTGRES_DATABASE_NAME ?? 'mynewdb',
};

function getRouter(dbClient) {
  const router = express.Router({ mergeParams: true });

  router
    .route('/hello')
    .get((req, res, next) => {
      const query = `INSERT INTO recipes (name)
        VALUES ('marvellous recipe');`;
      return dbClient.query(query)
        .then((result) => {
          console.log(result);
        })
        .then(() => {
          res.send('Hello toto!');
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });

  return router;
}

function createAndLaunchServer() {
  const server = express();
  const dbClient = createDBPool(dbSettings);

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.use((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`Service-a API is triggered for route: ${fullUrl}`);
    next();
  })

  server.use('/api', getRouter(dbClient));

  const app = server.listen(SERVER_PORT);

  console.log(`Server is running and listening port ${SERVER_PORT}`);

  return app;
}

createAndLaunchServer();
