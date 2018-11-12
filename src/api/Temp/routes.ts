import * as Hapi from "hapi";
import * as Joi from "joi";
import * as Boom from "boom";
import { IServerConfigurations } from "../../configurations";
import * as TempValidator from "./temp-validator";


export default function (
    server: Hapi.Server,
    configs: IServerConfigurations,

) {
    server.route({
        method: "GET",
        path: "/temp",
        options: {
            handler: (request: Request, h: Hapi.ResponseToolkit) => { return h.response('temp').code(200); },
            tags: ["api", "temp"],
            description: "Show all temp.",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "All temp responses"
                        },
                        "404": {
                            description: "Temp does not exists"
                        }
                    }
                }
            }
        }

    });

    server.route({
        method: "POST",
        path: "/temp",
        options: {
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                let newTemp = request.payload;
                try {
                    // let task: ITask = await this.database.taskModel.create(newTask);
                    return h.response(newTemp).code(201);
                } catch (error) {
                    return Boom.badImplementation(error);
                }
            },
            tags: ["api", "temp"],
            description: "Create temp.",
            validate: {
                payload: TempValidator.createTempModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "201": {
                            description: "Create temp"
                        }
                    }
                }
            }
        }

    });
}