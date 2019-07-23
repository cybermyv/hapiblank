import * as Hapi from "hapi";
import * as Boom from "boom";

import { IServerConfigurations } from './../../configurations/index';
import Store from "../../database";
import Persona, { IPersona } from "./persona-model";

export interface IPersonaList {
    persons: Persona[];
}

export default class PersonaController {
    constructor(private configs: IServerConfigurations) { }

    public async getAllPersons(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const conn = await Store.createConnection();
        if (conn) {
            try {
                const result: Persona[] = await conn.query('select * from persona');
                return h.response(result).code(200);

            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    } //--getAllPersons

    public async createPersona(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const conn = await Store.createConnection();
        let newPersona: IPersona = <IPersona>request.payload;

        //-- надо кучу параметров доставать из базы
        //-- пока все делаем максимально просто

        if (conn) {
            try {
                const persona = await conn.getRepository(Persona).save(newPersona); //-- переписать на insert ???
                return h.response(persona).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    } //--createPersona

    public async deletePersona(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const conn = await Store.createConnection();
        let _id = request.params['id'];

        if (conn) {
            try {
                let persona = await conn.query('delete from persona where id =?', [_id]);
                return h.response(persona).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }


    }
}