import * as Hapi from "hapi";
import * as Boom from "boom";
import * as uuid from "uuid";
// import { IDataBase } from "../../database";
import { ITemp } from './temp-model';
import { IServerConfigurations } from './../../configurations/index';

export default class TempController {
    private configs: IServerConfigurations;
    // private database: IDataBase;

    constructor(configs: IServerConfigurations
        // , database: IDataBase
        ) {
        // this.database = database;
        this.configs = configs;
    }

    public createTemp(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let newTemp: ITemp = <ITemp>request.payload;

        // console.log('request.query', request.query);
        newTemp.userId = uuid.v1();
        return h.response(newTemp).code(201);
    } catch(error) {
        return Boom.badImplementation(error);
    }


}