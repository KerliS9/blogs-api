const statusCode = require('../utils/httpStatus');

module.exports = (err, _req, res, _next) => {
  console.log('errorHandler', err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};
