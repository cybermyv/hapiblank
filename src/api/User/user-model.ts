export interface IUser {
    id: number;
    login: string;
    password: string;
    nodelink: number;
}

let _UserModel: any = {};

export const UserModel: IUser = _UserModel;