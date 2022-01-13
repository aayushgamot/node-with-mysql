const Joi = require("joi");
function portfoliovalidation(req) {
  const schema = Joi.object({
    projectcategory: Joi.required().messages({
      "string.base": `Project Category should be a type of 'text'`,
      "string.empty": `Project Category  cannot be an empty field`,
      "any.required": `Project Category  is a required field`,
    }),
    porjectname: Joi.string().min(3).required().messages({
      "string.base": `Project Name should be a type of 'text'`,
      "string.empty": `Project Name cannot be an empty field`,
      "any.required": `Project Name is a required field`,
    }),
    porjecttitle: Joi.string().min(3).required().messages({
      "string.base": `Project Title should be a type of 'text'`,
      "string.empty": `Project Title cannot be an empty field`,
      "any.required": `Project Title is a required field`,
    }),
    porjectdate: Joi.required().messages({
      "any.required": `date is a required field`,
    }),
    message: Joi.string().min(3).required().messages({
      "string.base": `Project message should be a type of 'text'`,
      "string.empty": `Project message cannot be an empty field`,
      "any.required": `Project message is a required field`,
    }),
  });
  return schema.validate(req);
}
module.exports = {
  portfoliovalidation,
};
