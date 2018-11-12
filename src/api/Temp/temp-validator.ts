import * as Joi from "joi";

export const createTempModel = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});

export const updateTempModel = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  completed: Joi.boolean()
});