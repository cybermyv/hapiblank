import * as sqlite3 from 'sqlite3';
import { IDataConfiguration } from "./configurations";
import { ITemp, TempModel } from './api/Temp/temp-model';
import { IUser, UserModel } from './api/User/user-model';



export interface IDataBase {
    // tempModel: {};
    // userModel: {};
    db: any;
}

export function init(config: IDataConfiguration): IDataBase {
    sqlite3.verbose();

    const db = new sqlite3.Database(config.connectionString, (err) => {
        if (err) {
            console.log("Ошибка подключения к базе данных", err);
        } else {
            console.log('База данных подключена');
        }
    });


    return {
        db
    };


}

