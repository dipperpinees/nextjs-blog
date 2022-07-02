import { useMutation } from '@apollo/client';
import { Avatar, Button, Divider } from '@mui/material';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import client from '../../lib/apollo/apollo-client';
import { GET_POST_BY_ID, POST_COMMENT } from '../../lib/apollo/post';
import { IPost } from '../../lib/interface/post.interface';
import { timeAgo } from '../../lib/timeAgo';
import userStore from '../../store/userStore';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export interface IPostProps extends IPost {}

export default function Post({
    id,
    title,
    content,
    category,
    author,
    createdAt,
    comments: commentsData,
}: IPostProps) {
    const user = userStore((state) => state.user);
    const [PostComment] = useMutation(POST_COMMENT);
    const [comments, setComments] = useState<any>(commentsData);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setShowScrollToTop(position !== 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSubmitComment = async (e: any) => {
        e.preventDefault();
        try {
            setComments([
                {
                    author: user,
                    content: e.target.content.value,
                },
                ...comments,
            ]);
            await PostComment({
                variables: {
                    commentData: {
                        postId: id,
                        content: e.target.content.value,
                    },
                },
            });
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <div className="post">
            <div className="post-center">
                <span>{category.title}</span>
                <h1 className="post-title">{title}</h1>
                <Link href={`/user/${author?.id}`}>
                    <a className="post-author">
                        <Avatar src={author?.avatar} sx={{ width: 56, height: 56 }} />
                        <div className="post-author-name">
                            <h5>{author?.name}</h5>
                            <span>{timeAgo(createdAt)}</span>
                        </div>
                    </a>
                </Link>

                <div dangerouslySetInnerHTML={{ __html: content }} className="post-content" />
                <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
                <div className="post-comment">
                    <h3>Bình luận ({comments.length})</h3>
                    <form onSubmit={handleSubmitComment}>
                        <Avatar
                            src={user?.avatar}
                            sx={{ width: 32, height: 32, marginRight: 1 }}
                        ></Avatar>
                        <input
                            type="text"
                            placeholder="Chia sẻ cảm nghĩ của bạn về bài viết"
                            name="content"
                            required
                        />
                        <Button variant="contained" size="small" color="success" type="submit">
                            Bình luận
                        </Button>
                    </form>
                    <ul>
                        {comments?.map(({ id, content, author, createdAt }: any, index: number) => (
                            <li key={index}>
                                <Link href={`/user/${id}`}>
                                    <a>
                                        <Avatar
                                            src={author?.avatar}
                                            sx={{ width: 32, height: 32, marginRight: 1 }}
                                        />
                                    </a>
                                </Link>
                                <section>
                                    <h5>
                                        <Link href={`/user/${id}`}>
                                            <a>
                                                {author?.name} <span>• {timeAgo(createdAt)}</span>
                                            </a>
                                        </Link>
                                    </h5>
                                    <p>{content}</p>
                                </section>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {showScrollToTop && <ArrowDropUpIcon className="post-top" onClick={() => window.scrollTo(0, 0)}/>}
        </div>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    try {
        const {
            data: { GetPostById: data },
        } = await client.query({
            query: GET_POST_BY_ID,
            variables: { id: Number(context.query.id) },
            fetchPolicy: 'no-cache',
        });
        return {
            props: data,
        };
    } catch (e: any) {
        return {
            redirect: {
                destination: '/404',
            },
        };
    }
}
