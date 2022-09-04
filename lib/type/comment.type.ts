import { IUser } from "./user.type";

export interface IComment {
    id: number;
    content: string;
    author: IUser;
    createdAt: string;
    updatedAt: string;
}