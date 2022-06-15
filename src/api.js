const express = require('express');
const errorHandler = require('./middleware/handleError');

// ...

const app = express();

app.use(express.json());
app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
