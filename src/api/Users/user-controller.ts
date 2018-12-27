import * as Hapi from "hapi";
import * as Boom from "boom";
import * as uuid from "uuid";
import * as Jwt from "jsonwebtoken";
import { IServerConfigurations } from './../../configurations/index';
import { Connection, Repository, getRepository, Entity } from 'typeorm';
import { IRequest, ILoginRequest } from './../../interfaces/request';

import Store from "../../database";
import { IUser } from './user-model';
import User from './user-model';

export interface IUserList {
	users: User[];
}

export default class UserController {
    constructor(private configs: IServerConfigurations) {
    }

    private generateToken(user: IUser) {
        const jwtSecret = this.configs.jwtSecret;
        const jwtExpiration = this.configs.jwtExpiration;
        const payload = { id: user.id };

        return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
    }

    public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
        const { login, password } = request.payload;


        let conn = await Store.createConnection();

        if (conn) {


            let user: IUser = await conn.query('select * from user where login=?', [login]);
            // return h.response(user).code(200);


            console.log('Pass - ', password);

            if (!user) { return Boom.unauthorized('Пользователь не найден'); }

            console.log('Return - ', user);

            // if (!user.validatePassword(password)) { return Boom.unauthorized("Неверный пароль"); }

            return { token: this.generateToken(user) };

        }
    }


    public async getAllUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {

        let conn = await Store.createConnection();

        if (conn) {
            try {
                const results: User[] = await conn.query('select * from user');
                return h.response(results).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    }

    public async createUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let newUser: IUser = <IUser>request.payload;

        let conn = await Store.createConnection();
        if (conn) {
            try {
                const results = await conn.getRepository(User).save(newUser);
                return h.response(results).code(201);

            } catch (e) {

                throw new Boom(e);
            }
        } else {

            return Boom.badImplementation();
        }
    }

    public async getUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let _id = request.params['id'];

        let conn = await Store.createConnection();
        if (conn) {
            try {
                let user = await conn.query('select * from user where id=?', [_id]);
                return h.response(user).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    }

    public async updateUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let _id = request.params['id'];

        let updatedUser: IUser = <IUser>request.payload;

        let conn = await Store.createConnection();
        if (conn) {
            try {
                let user = await conn.query('update user set login=?, password=?, nodelink=?  where id=?', [updatedUser.login, updatedUser.password, updatedUser.nodelink, _id]);
                return h.response(user).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    }

    public async deleteUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        let _id = request.params['id'];

        let conn = await Store.createConnection();
        if (conn) {
            try {
                let user = await conn.query('delete from user where id=?', [_id]);
                console.log(user);
                return h.response(user).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    }

}
