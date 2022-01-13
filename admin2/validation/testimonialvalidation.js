const Joi = require("joi");
function validateAddtestimonial(req) {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.base": `Testimonial Name should be a type of 'text'`,
      "string.empty": `Testimonial Name cannot be an empty field`,
      "any.required": `Testimonial Name is a required field`,
    }),
    address: Joi.string().min(3).required().messages({
      "string.base": `message should be a type of 'text'`,
      "string.empty": `message cannot be an empty field`,
      "any.required": `message is a required field`,
    }),
    email: Joi.string().min(3).required().messages({
      "string.base": `email Description should be a type of 'text'`,
      "string.empty": `email Description cannot be an empty field`,
      "any.required": `email Description is a required field`,
    }),
    image: Joi.required().messages({
      "string.empty": `Image cannot be an empty field`,
      "any.required": `Image is a required field`,
    }),
  });
  return schema.validate(req);
}
module.exports = {
  validateAddtestimonial,
};
