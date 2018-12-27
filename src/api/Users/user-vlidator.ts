import * as Joi from "joi";

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();

export const createUserModel = Joi.object().keys({
    id: Joi.number().required().default('3'),
    login: Joi.string().required().default('miron1'),
    password: Joi.string().required().default('111'),
    nodelink: Joi.number().required().default('1'),
});

export const updateUserModel = Joi.object().keys({
    login: Joi.string().required().default('miron1'),
    password: Joi.string().required().default('111'),
    nodelink: Joi.number().required().default('1')
});

export const loginUserModel = Joi.object().keys({
    login: Joi.string().trim().required().default('miron'),
    password: Joi.string().trim().required().default('111')
});
