import * as Hapi from "hapi";
import * as Joi from "joi";
import { IServerConfigurations } from "../../configurations";

export default function (
    server: Hapi.Server,
    configs: IServerConfigurations,

) {
    server.route({
        method: "GET",
        path: "/temp",
        options: {
            handler: (request: Request, h: Hapi.ResponseToolkit) => { return h.response('temp').code(201); },
        }
    });
}