const colors = require('colors');
const App = require('./app');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});


const PORT = process.env.PORT || 3000;

console.log('The Martian Navigation'.verbose);

const app = App();

app.listen(PORT);
console.info(`HTTP server port: ${PORT}`.info);
