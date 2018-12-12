import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection, Repository } from 'typeorm';
import User from './api/Users/user-model';
import * as path from 'path';

export default class Store {
	private static _conn: Connection;

	public static connectionOptions: ConnectionOptions = {
		type: 'sqlite',
		database: path.join(__dirname, 'dbase/mrdb.db'),
		entities: [ User ],
		synchronize: true
	};

	public static async createConnection() {
		if (!this._conn) {
			this._conn = await createConnection(this.connectionOptions);
		}
		return this._conn;
	}
}
