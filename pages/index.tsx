import { NextPageContext } from 'next';
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';
import PostCard from '../components/PostCard';
import { client } from '../lib/apollo';
import { FILTER_POSTS } from '../lib/apollo/post';
import { categoriesList } from '../lib/category';
import { IPost } from '../lib/type';
import { IPagination } from '../lib/type';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { userStore } from '../store';

export interface IHomeProps {
    posts: IPost[];
    tabType: 'new' | 'hot';
    pagination: IPagination;
}

export default function Home({ posts, tabType, pagination }: IHomeProps) {
    const router = useRouter();
    const user = userStore(state => state.user);
    
    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page,
            },
        });
    };

    return (
        <div className="home">
            {!user && <section className="banner">
                <div>
                    <h1>BLOGIFY</h1>
                    <p>Chia sẻ những góc nhìn - câu chuyện - tin tức</p>
                    <Link href="/signin">
                        <Button variant="contained">Viết bài ngay</Button>
                    </Link>
                </div>
                <img src="/banner.png" alt="banner" />
            </section>}
            <section className="home-posts">
                <section>
                    <div className="home-posts-tab">
                        <Link href="/?sort=hot">
                            <a className={tabType === 'hot' ? 'home-posts-tab-select' : undefined}>
                                Hot nhất 🔥
                            </a>
                        </Link>
                        <Link href="/?sort=new">
                            <a className={tabType === 'new' ? 'home-posts-tab-select' : undefined}>
                                Mới nhất
                            </a>
                        </Link>
                    </div>
                    {posts?.map((post) => (
                        <PostCard {...post} key={post.id} />
                    ))}
                    {pagination.totalPages > 1 && (
                        <Pagination
                            count={pagination.totalPages}
                            defaultPage={pagination.page}
                            onChange={handleChangePage}
                            color="primary"
                            style={{ display: 'flex', justifyContent: 'center' }}
                        />
                    )}
                </section>
                <aside>
                    <h4>KHÁM PHÁ CHỦ ĐỀ</h4>
                    <section>
                        {categoriesList.map(({ title, id }) => (
                            <Link href={`/search?categoryId=${id}`} key={id}>
                                <a>{title}</a>
                            </Link>
                        ))}
                    </section>
                </aside>
            </section>
        </div>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    try {
        const {
            data: {
                FilterPost: { docs: posts, pagination },
            },
        } = await client.query({
            query: FILTER_POSTS,
            variables: {
                filterData: {
                    page: Number(context.query.page) || 1,
                    limit: 12,
                    ...(context.query.sort === 'new' ? { createdAt: 'DESC' } : { views: 'DESC' }),
                },
            },
            fetchPolicy: 'no-cache',
        });
        return {
            props: { posts, tabType: context.query.sort || 'hot', pagination },
        };
    } catch (e: any) {
        console.log(e.message);
        return {
            props: {
                posts: [],
                pagination: {
                    totalPages: 1,
                    page: 1,
                },
            },
        };
    }
}
