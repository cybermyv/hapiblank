import * as Hapi from "hapi";
import * as Boom from "boom";
import { IServerConfigurations } from "./configurations";
import { IPlugin } from './plugins/interfaces';


import * as Temp from "./api/Temp";
import * as User from "./api/Users";


export async function init(configs: IServerConfigurations): Promise<Hapi.Server> {
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
        const pluginOptions = {serverConfigs: configs };

        let pluginPromises: Promise<any>[] = [];

        plugins.forEach((pluginName: string) => {
            var plugin: IPlugin = require("./plugins/" + pluginName).default();
            console.log(
                `Register Plugin ${plugin.info().name} v${plugin.info().version}`
            );
            pluginPromises.push(plugin.register(server, pluginOptions));
            // pluginPromises.push(plugin.register(server));
        });

        await Promise.all(pluginPromises);

        console.log("All plugins registered successfully.");

        console.log("Register Routes");
        Temp.init(server, configs);
        User.init(server, configs);

        return server;

    } catch (err) {
        console.log("Error starting server: ", err);
        throw err;
    }
}