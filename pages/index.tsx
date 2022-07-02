import { NextPageContext } from 'next';
import Link from 'next/link';
import PostCard from '../components/PostCard';
import client from '../lib/apollo/apollo-client';
import { HOME_POSTS } from '../lib/apollo/post';
import { categoriesList } from '../lib/category';
import { IPost } from '../lib/interface/post.interface';

export interface IHomeProps {
    posts: IPost[];
    tabType: 'new' | 'hot';
}

export default function Home({ posts, tabType }: IHomeProps) {
    return (
        <div className="home">
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
                    {posts.map((post) => (
                        <PostCard {...post} key={post.id} />
                    ))}
                </section>
                <aside>
                    <h4>KHÁM PHÁ CHỦ ĐỀ</h4>
                    <section>
                        {categoriesList.map(({title, id}) => (
                            <p key={id}>{title}</p>
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
                FilterPost: { docs: posts },
            },
        } = await client.query({
            query: HOME_POSTS,
            variables: {
                filterData: {
                    page: 1,
                    limit: 12,
                    ...(context.query.sort === 'new' ? { createdAt: 'DESC' } : { views: 'DESC' }),
                },
            },
            fetchPolicy: 'no-cache',
        });
        return {
            props: { posts, tabType: context.query.sort || 'hot' },
        };
    } catch (e: any) {
        console.log(e.message);
    }
}
