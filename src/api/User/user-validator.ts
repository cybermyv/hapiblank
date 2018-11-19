import * as Joi from "joi";

export const createUserModel = Joi.object().keys({
login: Joi.string().required().default('miron1'),
password: Joi.string().required().default('111'),
});