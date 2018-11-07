import * as Hapi from "hapi";
import * as Boom from "boom";
import { IServerConfigurations } from "./configurations/index";

export function init(configs: IServerConfigurations) {
    try {
        const port = process.env.PORT || configs.port;

        const server = new Hapi.Server({
            debug: { request: ['error'] },
            port: port,
            routes: {
                cors: {
                    origin: ["*"]
                }
            }
        });

        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }
        console.log("Register Routes - no route");
        return server;

    } catch (err) {
        console.log("Error starting server: ", err);
        throw err;
    }
}