import * as nconf from "nconf";
import * as path from "path";

/* потом надо переделать определение базы данных, а то она некрасиво лежит в корне

const path = require('path')
const dbPath = path.resolve(__dirname, 'todo.db')
const db = new sqlite3.Database(dbPath)
*/

//Read Configurations
const configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
        type: "file",
        file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
    }
});

export interface IServerConfigurations {
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
    routePrefix: string;
}

export interface IDataConfiguration {
    connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
    return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
    return configs.get("server");
}