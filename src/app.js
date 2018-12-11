const express = require('express');
const morgan = require('morgan');
const { Probe } = require('./models');
const { probeSerializer } = require('./utils');


module.exports = () => {
  const app = express();
  const probe = new Probe();

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

  app.get('/ping/', (request, response) => {
    response.send('OK');
  });

  return app;
};
