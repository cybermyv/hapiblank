import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Boom from 'boom';

import { IServerConfigurations } from "../../configurations";
import UserController from './user-controller';
import * as UserValidator from './user-vlidator';

export default function (
    server: Hapi.Server,
    configs: IServerConfigurations,

) {
    const userController = new UserController(configs);
    server.bind(userController);

    server.route({
        method: "GET",
        path: "/api/v1/user",
        options: {
            handler: userController.getAllUser,
            auth: "jwt",
            tags: ['api', 'user'],
            description: "Show all users.",
            validate: {
                headers: UserValidator.jwtValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "All users responses"
                        },
                        "404": {
                            description: "Users does not exists"
                        }
                    }
                }
            }
        }

    });

    server.route({
        method: "GET",
        path: "/api/v1/user/{id}",
        options: {
            handler: userController.getUserById,
            auth: "jwt",
            tags: ['api', 'user'],
            description: "Get task by id.",
            validate: {
                headers: UserValidator.jwtValidator,
                params: {
                    id: Joi.string().required()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Users founded"
                        },
                        "404": {
                            description: "Users does not exists."
                        }
                    }
                }
            }
        }

    });

    server.route({
        method: 'POST',
        path: '/api/v1/user',
        options: {
            handler: userController.createUser,
            auth: false,
            tags: ['api', 'user'],
            description: 'Create new User into db',
            validate: {
               payload: UserValidator.createUserModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "201": {
                            description: "Create user"
                        },
                        "404": {
                            description: "User does not exists"
                        }
                    }
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/v1/user/{id}',
        options: {
            handler: userController.updateUser,
            auth: "jwt",
            tags: ['api', 'user'],
            description: 'Update user by id',
            validate: {
                headers: UserValidator.jwtValidator,
                params: {
                    id: Joi.string().required()
                },
                payload: UserValidator.updateUserModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Update user"
                        },
                        "404": {
                            description: "User does not exists"
                        }
                    }
                }
            }

        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/v1/user/{id}',
        options: {
            handler: userController.deleteUser,
            auth: "jwt",
            tags: ['api', 'user'],
            description: 'Delete user by id',
            validate: {
                headers: UserValidator.jwtValidator,
                params: {
                    id: Joi.string().required()
                }
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Delete user"
                        },
                        "404": {
                            description: "User does not exists"
                        }
                    }
                }
            }

        }
    });

    server.route({
        method: 'POST',
        path:'/api/v1/login',
        options:{
            handler: userController.loginUser,
            auth: false,
            tags: ['api', 'login'],
            description:'Login a user',
            validate:{
                payload: UserValidator.loginUserModel
            },
            plugins:{
                'hapi-swagger':{
                    responses:{
                        '200': {
                            description: 'User logged in !'
                        }
                    }
                }
            }
        }
    });

}
