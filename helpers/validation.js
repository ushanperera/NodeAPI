const Joi = require('@hapi/joi')

const validateRegister = Joi.object({
  userName: Joi.string().lowercase().required(),
  password: Joi.string().min(2).required(),
})

const validateLogin = Joi.object({
  // email: Joi.string().email().lowercase().required(),
  userName: Joi.string().lowercase().required(),
  password: Joi.string().min(2).required(),
})

module.exports = {
  validateRegister,
  validateLogin
}
