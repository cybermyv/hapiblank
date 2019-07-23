import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Boom from 'boom';

import { IServerConfigurations } from '../../configurations';
import PersonaController from './persona-controller';
import * as PersonaValidator from './persona-validator';

export default function (
    server: Hapi.Server,
    configs: IServerConfigurations,
) {
    const personaCtrl = new PersonaController(configs);
    server.bind(personaCtrl);

    server.route({
        method: 'GET',
        path: '/api/v1/persona',
        options: {
            handler: personaCtrl.getAllPersons,
            auth: 'jwt',
            tags: ["api", "persona"],
            description: 'Show all persons',
            validate: {
                headers: PersonaValidator.jwtValidator
            },
            plugins: {
                'hapi-swagger': {
                    response: {
                        '200': {
                            description: 'All persons responsed'
                        },
                        '404': {
                            description: 'Persons does not exist'
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/v1/persona',
        options: {
            handler: personaCtrl.createPersona,
            auth: 'jwt',
            tags: ['api', 'persona'],
            description: 'Create persona',
            validate: {
                payload: PersonaValidator.createPersonaModel,
                headers: PersonaValidator.jwtValidator,
            },
            plugins: {
                'hapi-swagger': {
                    response: {
                        '201': { description: 'Create persona' },
                        '404': { description: 'Persona does not exist' }
                    }
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path:'/api/v1/persona/{id}',
        options:{
            handler: personaCtrl.deletePersona,
            auth: 'jwt',
            tags:['api', 'persona'],
            description: 'Delete persona by id',
            validate:{
                headers: PersonaValidator.jwtValidator,
                params:{
                    id: Joi.number().required()
                }
            },
            plugins:{
                'hapi-swagger':{
                    response:{
                        '200': { description: 'Persona deleted'},
                        '404': {description: 'Persona does not exist'}
                    }
                }
            }
        }
    });



}