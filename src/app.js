const express = require('express');
const morgan = require('morgan');
const { Probe } = require('./models');


module.exports = () => {
  const app = express();
  const probe = new Probe();

  app.use(morgan('tiny'));

  app.get('/current/', (request, response) => {
    response.json({
      x: probe.x,
      y: probe.y,
    });
  });

  app.get('/ping/', (request, response) => {
    response.send('OK');
  });

  return app;
};
