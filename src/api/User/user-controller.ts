import * as Hapi from "hapi";
import * as Boom from "boom";
import * as uuid from "uuid";
import * as sqlite3 from 'sqlite3';

import { IDataBase } from "../../database";
import { IUser } from './user-model';
import { IServerConfigurations } from './../../configurations/index';

sqlite3.verbose();

const db = new sqlite3.Database('./db/mrdb.db', (err) => {
    if (err) {
        console.log("Ошибка подключения к базе данных", err);
    } else {
        console.log('База данных подключена');
    }
});


export default class UserController {
    private configs: IServerConfigurations;
    private database: IDataBase;

    constructor(configs: IServerConfigurations, database: IDataBase) {
        this.database = database;
        this.configs = configs;

    }

    // public  getAllUsers(request: Hapi.Request, h: Hapi.ResponseToolkit) {

    //     db.all('select * from user', (err, data) => {
    //         if (err) {
    //             throw err;
    //         } else {
    //             return h.response(data).code(200);

    //         }
    //     });

    // }

    public getAllUsers(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<IUser> {


        return new Promise(async (res, rej) => {
            users = await db.all('select * from user')

        });
    }

}