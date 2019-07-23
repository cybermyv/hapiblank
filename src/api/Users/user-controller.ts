import * as Hapi from "hapi";
import * as Boom from "boom";
import * as uuid from "uuid";
import * as Jwt from "jsonwebtoken";
import * as Bcrypt from "bcryptjs";

import { IServerConfigurations } from './../../configurations/index';
// import { Connection, Repository, getRepository, Entity } from 'typeorm';
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

    private validatePassword = (user: IUser, requestPassword: string): boolean => {
        if (!user) { return false; }
        return Bcrypt.compareSync(requestPassword, user.password);
    }

    private hashPassword = async (user: IUser) => {
        user.password = await Bcrypt.hashSync(user.password, Bcrypt.genSaltSync(8));
    }

    public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {

        const { login, password } = request.payload;
        let conn = await Store.createConnection();
        if (conn) {
            let userTmp: IUser = await conn.query('select * from user where login=?', [login]);
            let user = userTmp[0];

            if (!user) { return Boom.unauthorized('Пользователь не найден'); }

            if (!this.validatePassword(user, password)) { return Boom.unauthorized("Неверный пароль"); } else {
                return { token: this.generateToken(user) };
            }

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
                await this.hashPassword(newUser);
                const user = await conn.getRepository(User).save(newUser);
                return h.response({ token: this.generateToken(user) }).code(201);
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
                let user = await conn.query('select id, login, nodelink from user where id=?', [_id]);
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

        await this.hashPassword(updatedUser);

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
                return h.response(user).code(200);
            } catch (e) {
                throw new Boom(e);
            }
        } else {
            return Boom.badImplementation();
        }
    }

}
