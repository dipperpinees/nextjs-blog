import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client, GET_FOLLOWERS, GET_FOLLOWINGS } from '../../lib/apollo';
import { IUser } from '../../lib/type';

export interface IFollowListProps {
    id: number;
    type: 'Follower' | 'Following';
    onClose: () => void;
    isOwn: boolean;
}

export default function FollowList({ type, id, onClose, isOwn }: IFollowListProps) {
    const [followList, setFollowList] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            switch (type) {
                case 'Follower': {
                    setFollowList(await getFollowerList(id));
                    break;
                }
                case 'Following': {
                    setFollowList(await getFollowingList(id));
                    break;
                }
            }
            setIsLoading(false);
        })();
    }, []);

    const handleViewProfile = (id: number) => {
        onClose();
        router.push(`/user/${id}`);
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{type === 'Follower' ? 'Người theo dõi' : 'Đang theo dõi'}</DialogTitle>
            {isLoading ? (
                <CircularProgress color="primary" style={{ margin: '20px auto' }} />
            ) : (
                <List sx={{ pt: 0 }}>
                    {followList.map(({ id, name, avatar }) => (
                        <ListItem key={id} button onClick={() => handleViewProfile(id)}>
                            <ListItemAvatar>
                                <Avatar alt={name} src={avatar}></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Dialog>
    );
}

const getFollowingList = async (id: number): Promise<IUser[]> => {
    const {
        data: {
            GetUserById: { following },
        },
    } = await client.query({
        query: GET_FOLLOWINGS,
        variables: { id },
    });
    return following;
};

const getFollowerList = async (id: number): Promise<IUser[]> => {
    const {
        data: {
            GetUserById: { follower },
        },
    } = await client.query({
        query: GET_FOLLOWERS,
        variables: { id },
    });
    return follower;
};
