import { Button, Divider, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import styles from './styles.module.scss';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { userStore } from '../../../store';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    const user = userStore((state) => state.user);
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const router = useRouter();

    return (
        <div className={styles.header}>
            {showSearchBar && (
                <SearchBar
                    hideSearchBar={() => setShowSearchBar(false)}
                    submitSearch={(value) => router.push(`/search?search=${value}`)}
                />
            )}
            <div>
                <Link href="/">
                    <a className={styles.logo}>
                        <img src="/favicon.png" alt="logo" />
                        <h2>
                            <i>
                                bl<span>o</span>gify
                            </i>
                        </h2>
                    </a>
                </Link>
            </div>
            <div className={styles.header__user}>
                <SearchIcon className={styles.icon} onClick={() => setShowSearchBar(true)} />
                {user && <NotificationsIcon className={styles.icon} />}
                <Divider orientation="vertical" sx={{ margin: 1, height: 28 }} />
                {user && (
                    <div>
                        <Link href="/post/edit">
                            <Button
                                variant="outlined"
                                size="medium"
                                style={{ textTransform: 'none' }}
                                className={styles.header__user__write}
                            >
                                <CreateIcon sx={{ marginRight: 1 }} /> Viết bài
                            </Button>
                        </Link>
                        <ProfileMenu user={user} />
                    </div>
                )}
                {!user && (
                    <div className={styles.header__login}>
                        <Link href="/signin">
                            <Button size="medium" color="inherit">
                                <h4>Đăng nhập</h4>
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="contained" size="medium">
                                Đăng ký
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
