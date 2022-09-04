import { IPost } from "./post.type";

export interface IUser {
    id: number;
    email: string,
    password: string;
    name: string;
    avatar: string;
    description: string;
    work: string;
    education: string;
    posts: IPost[];
    address: string;
    followerNumber: number;
    followingNumber: number;
    isFollowed: boolean;
}