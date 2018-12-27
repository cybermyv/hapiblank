import { IPlugin, IPluginOptions } from '../interfaces';
import * as Hapi from 'hapi';

import { IUser } from '../../api/Users/user-model';
import User from '../../api/Users/user-model';

import { IRequest } from '../../interfaces/request';
import Store from '../../database';

import { Connection, Repository, getRepository, Entity } from 'typeorm';

const register = async (server: Hapi.Server, options: IPluginOptions): Promise<void> => {
	try {
		const serverConfig = options.serverConfigs;

		const validateUser = async (decoded: any, request: IRequest, h: Hapi.ResponseToolkit) => {
			const conn = await Store.createConnection();
			const user = await conn.query('select * from user where id=?', [ decoded._id ]);

			if (!user) {
				return { isValid: false };
			}

			return { isValid: true };
		};
		await server.register(require('hapi-auth-jwt2'));

		return setAuthStrategy(server, {
			config: serverConfig,
			validate: validateUser
		});
	} catch (err) {
		console.log(`Error registering jwt plugin: ${err}`);
		throw err;
	}
};

const setAuthStrategy = async (server, { config, validate }) => {
	server.auth.strategy('jwt', 'jwt', {
		key: config.jwtSecret,
		validate,
		verifyOptions: {
			algorithms: [ 'HS256' ]
		}
	});
	server.auth.default('jwt');

	return;
};
export default (): IPlugin => {
	return {
		register,
		info: () => {
			return { name: 'JWT Authentication', version: '1.0.0' };
		}
	};
};
