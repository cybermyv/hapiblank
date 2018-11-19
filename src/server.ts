import * as Hapi from "hapi";
import * as Boom from "boom";
import { IPlugin } from './plugins/interfaces';
import { IServerConfigurations } from "./configurations";
import * as Temp from "./api/Temp";
import * as User from "./api/User";

import { IDataBase } from "./database";


export async function init(configs: IServerConfigurations, database: IDataBase): Promise<Hapi.Server> {
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

        //-- Подключаем плагины

        const plugins: Array<string> = configs.plugins;

        const pluginOptions = {
            database: database,
            serverConfigs: configs
        };

        let pluginPromises: Promise<any>[] = [];

        plugins.forEach((pluginName: string) => {
            var plugin: IPlugin = require("./plugins/" + pluginName).default();
            console.log(
                `Register Plugin ${plugin.info().name} v${plugin.info().version}`
            );
            // pluginPromises.push(plugin.register(server, pluginOptions));
            pluginPromises.push(plugin.register(server));
        });

        await Promise.all(pluginPromises);

        console.log("All plugins registered successfully.");

        console.log("Register Routes");

        Temp.init(server, configs, database);
        User.init(server, configs, database);

        return server;

    } catch (err) {
        console.log("Error starting server: ", err);
        throw err;
    }
}