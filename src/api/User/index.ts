import * as Hapi from "hapi";
import Routes from "./routes";
import { IServerConfigurations } from "../../configurations";
import { IDataBase } from "../../database";


export function init(
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDataBase

) {
  Routes(server, configs, database);
}