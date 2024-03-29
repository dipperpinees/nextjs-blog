import { Avatar } from '@mui/material';
import { IPost } from '../../lib/type';
import styles from './styles.module.scss';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import { timeAgo } from '../../lib/timeAgo';

export interface IPostCardProps extends IPost {}

export default function PostCard({
    id,
    thumbnail,
    title,
    category,
    author,
    views,
    createdAt,
    description,
}: IPostCardProps) {
    return (
        <Link href={`/post/${id}`}>
            <a>
                <div className={styles.post__card}>
                    <div className={styles.thumbnail}>
                        <img
                            src={
                                thumbnail ||
                                'https://dichvuquangcao.vn/wp-content/uploads/2021/04/yty.png'
                            }
                            alt="thumbnail"
                        />
                    </div>
                    <div className={styles.post__info}>
                        <Link href={`/search?categoryId=${category.id}`}>
                            <span>{category.title}</span>
                        </Link>
                        <h3>{title}</h3>
                        <p>{description}...</p>
                        <Link href={`/user/${author?.id}`}>
                            <div className={styles.post__author}>
                                <Avatar src={author?.avatar} sx={{ width: 28, height: 28 }} />
                                <p>{author?.name}</p>
                                <span>• {timeAgo(createdAt)}</span>
                            </div>
                        </Link>
                    </div>
                    <span>
                        <RemoveRedEyeIcon sx={{ fontSize: 14 }} />
                        {views}
                    </span>
                </div>
            </a>
        </Link>
    );
}
