import * as Hapi from "hapi";
import { IServerConfigurations } from '../configurations/index';

export interface IPluginOptions {
    serverConfigs: IServerConfigurations;
}


export interface IPlugin {
    register(server: Hapi.Server, options?: IPluginOptions): Promise<void>;
    info(): IPluginInfo;
}

export interface IPluginInfo {
    name: string;
    version: string;
}
