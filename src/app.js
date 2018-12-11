const express = require('express');
const morgan = require('morgan');


module.exports = () => {
  const app = express();

  app.use(morgan('tiny'));

  app.get('/ping/', (request, response) => {
    response.send('OK');
  });

  return app;
};
