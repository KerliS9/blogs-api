const Joi = require('joi');
const statusCode = require('../utils/httpStatus');

/* const checkTypeDetails = ({ details }) => {
  const { type } = details[0];
  if (type === 'any.required') return 400;
  return 422;
}; */

const newUserValidation = (req, _res, next) => {
  // console.log('middleware', req.body);
  const user = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(), // minDomainAtoms
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  });/* .messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 8 characters long',
  }); */

  const { error } = user.validate(req.body);
  // console.log('error', error.details);

  if (error) {
    next({
      statusCode: statusCode.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = { newUserValidation };