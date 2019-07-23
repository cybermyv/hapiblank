import * as Joi from 'joi';

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();

export const createPersonaModel = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    familiid: Joi.number().required(),
    linkeduser: Joi.number().required(),
    description: Joi.string().required(),
});

