module.exports = (err, _req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }
  if (err.status) {
    return res.status(300).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal Server Error' });
  next();
};
