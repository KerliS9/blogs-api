const statusCode = require('../utils/httpStatus');

module.exports = (err, _req, res, _next) => {
  console.log('errorHandler', err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};
