const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required().error(new Error("missing required name field")),
  email: Joi.string()
    .min(3)
    .required()
    .email()
    .error(new Error("missing required email field")),
  phone: Joi.string()
    .length(14)
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .required()
    .error(
      new Error(
        "missing required phone field. supports the following formats: (###) ###-#### "
      )
    ),
});

module.exports = { contactAddSchema };
