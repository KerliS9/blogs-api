const Joi = require('joi');

const checkTypeDetails = ({ details }) => {
  const { type } = details[0];
  if (type === 'any.required') return 400;
  return 422;
};

const validateProduct = (req, _res, next) => {
  const product = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),  
  }).messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
    'number.min': '{{#label}} must be greater than or equal to 1',
  });

  const { error } = product.validate(req.body);

  if (error) {
    next({
      statusCode: checkTypeDetails(error),
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = { validateProduct };