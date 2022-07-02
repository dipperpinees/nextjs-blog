import { IComment } from "./comment.interface";
import { IUser } from "./user.type";

export interface IPost {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    author: IUser;
    createdAt: string;
    updatedAt: string;
    views: number;
    description?: string;
    comments?: [IComment];
    category: {
        id: number;
        title: string;
    }
}