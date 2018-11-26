import * as Hapi from "hapi";
import * as Joi from "joi";
import * as Boom from "boom";
import { IDataBase } from "../../database";
import { IServerConfigurations } from "../../configurations";

import UserController from './user-controller';
import * as UserValidator from './user-validator';



export default function (
    server: Hapi.Server,
    configs: IServerConfigurations,
    database: IDataBase

) {
    const userController = new UserController(configs, database);
    server.bind(userController);

    server.route({
        method: 'GET',
        path: '/users',
        options: {
            handler: userController.getAllUsers,
            tags: ["api", "user"],
            description: "Show all temp.",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "All user responses"
                        },
                        "404": {
                            description: "Users does not exists"
                        }
                    }
                }
            }

        }
    });



}