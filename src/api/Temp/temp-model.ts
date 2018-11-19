export interface ITemp {
    userId: string;
    name: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updateAt: Date;
}

let _TempModel: any = {};

export const TempModel: ITemp = _TempModel;