const express = require('express');
const morgan = require('morgan');
const { Probe } = require('./models');
const { probeSerializer } = require('./utils');
const { LeftTheMatrix, InvalidCommand } = require('./errors');

const { MATRIX_SIZE } = process.env;


module.exports = () => {
  const app = express();
  const probe = new Probe({
    matrixSize: MATRIX_SIZE && MATRIX_SIZE.split('x'),
  });

  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/current/', (request, response) => {
    response.json(probeSerializer(probe));
  });

  app.patch('/exec/', (request, response) => {
    const { commands } = request.body;
    probe.exec(commands);
    response.json(probeSerializer(probe));
  });

  app.put('/initial/', (request, response) => {
    probe.x = 0;
    probe.y = 0;
    response.status(204);
    response.send();
  });

  app.get('/ping/', (request, response) => {
    response.send('OK');
  });

  app.use((error, request, response, next) => {
    if (error) {
      if (error instanceof LeftTheMatrix) {
        response.status(400);
        response.json({
          error: 'Commands not executed! Probe left the matrix.',
        });
      } else if (error instanceof InvalidCommand) {
        response.status(400);
        response.json({
          error: 'List with invalid command...',
        });
      } else {
        response.status(500);
        response.json({
          error,
        });
      }
    } else {
      next();
    }
  });

  return app;
};
