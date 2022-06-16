const express = require('express');
const errorHandler = require('./middleware/handleError');
const routers = require('./router');

// ...

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(routers);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
