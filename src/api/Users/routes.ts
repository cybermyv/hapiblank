import * as Hapi from "hapi";
import * as Joi from "joi";
import * as Boom from "boom";

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
        path: "/user",
        options: {
            handler: userController.getAllUser,
            tags: ['api', 'user'],
            description: "Show all users.",
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
        path: "/user/{id}",
        options: {
            handler: userController.getUserById,
            tags: ['api', 'user'],
            description: "Get task by id.",
            validate: {
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
        path: '/user',
        options: {
            handler: userController.createUser,
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
        path: '/user/{id}',
        options: {
            handler: userController.updateUser,
            tags: ['api', 'user'],
            description: 'Update user by id',
            validate: {
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
        path: '/user/{id}',
        options: {
            handler: userController.deleteUser,
            tags: ['api', 'user'],
            description: 'Delete user by id',
            validate: {
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

}