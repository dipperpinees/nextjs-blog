import { Pagination } from '@mui/material';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import PostCard from '../components/PostCard';
import { client } from '../lib/apollo';
import { FILTER_POSTS } from '../lib/apollo/post';
import { categoriesList } from '../lib/category';
import { IPagination } from '../lib/type';
import { IPost } from '../lib/type';

export interface ISearchProps {
    posts: IPost[];
    pagination: IPagination;
    search: any;
}

export default function Search({
    posts,
    pagination,
    search: { categoryId, search },
}: ISearchProps) {
    const router = useRouter();

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page
            }
        })
    }

    return (
        <div className="search">
            {categoryId && (
                <h2>
                    {categoriesList[categoryId - 1].emoji} {categoriesList[categoryId - 1].title}
                </h2>
            )}
            {search && (
                <h2>
                    Kết quả tìm kiếm: <i>"{search}"</i>
                </h2>
            )}
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <PostCard {...post} />
                        </li>
                    ))
                ) : (
                    <h4>Không có kết quả tìm kiếm thoả mãn</h4>
                )}
                {pagination.totalPages > 1 && (
                    <Pagination
                        count={pagination.totalPages}
                        defaultPage={pagination.page}
                        onChange={handleChangePage}
                        color="primary"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    />
                )}
            </ul>
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
                filterData: handleSearchVariable(context.query),
            },
        });
        return {
            props: {
                posts,
                search: context.query,
                pagination,
            },
        };
    } catch (e: any) {
        console.log(e.message);
        return {
            props: {
                docs: [],
                search: context.query,
            },
        };
    }
}

const handleSearchVariable = ({ page, categoryId, search, sort }: any) => {
    return {
        page: page ? Number(page) : 1,
        limit: 10,
        ...(categoryId && { categoryId: Number(categoryId) }),
        ...(search && { search: search }),
        ...(sort === 'hot' ? { views: 'DESC' } : { createdAt: 'DESC' }),
    };
};
