import { useMutation } from '@apollo/client';
import { Avatar, Button } from '@mui/material';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';
import client from '../../lib/apollo/apollo-client';
import { FOLLOW, UNFOLLOW, USER_PROFILE } from '../../lib/apollo/user';
import { IUser } from '../../lib/interface/user.type';
import userStore from '../../store/userStore';

export interface IUserProps extends IUser {}

export default function User({
    id,
    name,
    avatar,
    description,
    followerNumber: _followerNumber,
    followingNumber,
    posts,
    isFollowed: _isFollowed
}: IUserProps) {
    const user = userStore((state) => state.user);
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UNFOLLOW);
    const router = useRouter();
    const [followerNumber, setFollowerNumber] = useState<number>(_followerNumber || 0);
    const [isFollowed, setIsFollowed] = useState(_isFollowed);

    const handleFollow = async () => {
        try {
            if (!user) {
                router.push('/signin');
                return;
            }
            await follow({
                variables: { id },
            });
            setIsFollowed(true);
            setFollowerNumber(followerNumber + 1);
        } catch (e) {
            console.log(e);
        }
    };

    const handleUnFollow = async () => {
        try {
            await unFollow({
                variables: { id },
            });
            setIsFollowed(false);
            setFollowerNumber(followerNumber - 1);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="user">
            <div className="user-wallpaper"></div>
            <div className="user-main">
                <div className="user-main-avatar">
                    <Avatar src={avatar} />
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                {(user?.id !== Number(id) || !user) &&
                    (isFollowed ? (
                        <Button
                            variant="contained"
                            color="inherit"
                            className="user-main-button"
                            onClick={handleUnFollow}
                        >
                            Đã theo dõi
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            className="user-main-button"
                            onClick={handleFollow}
                        >
                            Theo dõi
                        </Button>
                    ))}
                <div className="user-main-follow">
                    <div>
                        <span>FOLLOWER</span>
                        {followerNumber}
                    </div>
                    <div>
                        <span>FOLLOWING</span>
                        {followingNumber}
                    </div>
                </div>
            </div>

            <div className="user-posts">
                {!!posts?.length && <h3>Bài viết({posts?.length})</h3>}
                <ul>
                    {posts?.map((post) => (
                        <li key={post.id}>
                            <PostCard {...post} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    try {
        const {
            data: { GetUserById: user },
        } = await client.query({
            query: USER_PROFILE,
            variables: { id: Number(context.query.id) },
            context: { headers: { Cookie: context.req?.headers.cookie || '' } },
            fetchPolicy: 'no-cache',
        });
        return {
            props: { ...user },
        };
    } catch (e: any) {
        console.log(e.message);
        return {
            redirect: {
                destination: '/404',
            },
        };
    }
}
