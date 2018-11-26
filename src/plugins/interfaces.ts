import * as Hapi from "hapi";
import { IServerConfigurations } from '../configurations/index';

export interface IPluginOptions {
    serverConfig: IServerConfigurations;
}

export interface IPluginInfo {
    name: string;
    version: string;
}

export interface IPlugin {
    register(server: Hapi.Server, options?: IPluginOptions): Promise<void>;
    info(): IPluginInfo;
}

