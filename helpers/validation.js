const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  userName: Joi.string().lowercase().required(),
  password: Joi.string().min(2).required(),
})

const authSchema2 = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
  })

module.exports = {
  authSchema,
  authSchema2
}
