import { useMutation } from '@apollo/client';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, Button } from '@mui/material';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FollowList from '../../components/FollowList';
import PostCard from '../../components/PostCard';
import UploadAvatar from '../../components/UploadAvatar';
import { client } from '../../lib/apollo';
import { FOLLOW, UNFOLLOW, USER_PROFILE } from '../../lib/apollo/user';
import useServerSideState from '../../lib/hook/useServerSideState';
import { IUser } from '../../lib/type';
import { userStore } from '../../store';

export interface IUserProps extends IUser {}

export default function User({
    id,
    name,
    avatar,
    description,
    followerNumber: _followerNumber,
    followingNumber,
    posts,
    isFollowed: _isFollowed,
}: IUserProps) {
    const user = userStore((state) => state.user);
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UNFOLLOW);
    const router = useRouter();
    const [followerNumber, setFollowerNumber] = useServerSideState(_followerNumber);
    const [isFollowed, setIsFollowed] = useServerSideState(_isFollowed);
    const [updateAvatar, setUpdateAvatar] = useState<boolean>(false);
    const [showFollower, setShowFollower] = useState<boolean>(false);
    const [showFollowing, setShowFollowing] = useState<boolean>(false);

    const handleFollow = async () => {
        try {
            if (!user) {
                router.push('/signin');
                return;
            }
            setIsFollowed(true);
            setFollowerNumber(followerNumber + 1);
            await follow({
                variables: { id },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleUnFollow = async () => {
        try {
            setIsFollowed(false);
            setFollowerNumber(followerNumber - 1);
            await unFollow({
                variables: { id },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleShowFollower = () => {
        if (followerNumber <= 0) return;
        setShowFollower(true);
    }

    const handleShowFollowing = () => {
        if (followingNumber <= 0) return;
        setShowFollowing(true);
    }

    return (
        <div className="user">
            <Head>
                <title>{`Trang cá nhân của ${name}`} </title>
            </Head>
            <div className="user-wallpaper"></div>
            <div className="user-main">
                <div className="user-main-avatar">
                    <Avatar src={user?.id === Number(id) ? user.avatar : avatar} />
                    {user?.id === Number(id) && (
                        <Button color="inherit" onClick={() => setUpdateAvatar(true)}>
                            <PhotoCamera />
                        </Button>
                    )}
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
                            className="user-main-button"
                            onClick={handleFollow}
                        >
                            Theo dõi
                        </Button>
                    ))}
                <div className="user-main-follow">
                    <div onClick={handleShowFollower}>
                        <span>FOLLOWER</span>
                        {followerNumber}
                    </div>
                    <div onClick={handleShowFollowing}>
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
            {showFollower && (
                <FollowList
                    onClose={() => setShowFollower(false)}
                    id={id}
                    type="Follower"
                    isOwn={user?.id === id}
                />
            )}
            {showFollowing && (
                <FollowList
                    onClose={() => setShowFollowing(false)}
                    id={id}
                    type="Following"
                    isOwn={user?.id === id}
                />
            )}
            {updateAvatar && <UploadAvatar onClose={() => setUpdateAvatar(false)} />}
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
        return {
            redirect: {
                destination: '/404',
            },
        };
    }
}
