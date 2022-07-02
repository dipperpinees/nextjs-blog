import { Button } from '@mui/material';
import Link from 'next/link';
import userStore from '../../../store/userStore';
import ProfileMenu from './ProfileMenu';
import styles from './styles.module.scss';
import CreateIcon from '@mui/icons-material/Create';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    const user = userStore((state) => state.user);

    return (
        <div className={styles.header}>
            <div>
                <Link href="/">
                    <a>LOGO</a>
                </Link>
            </div>
            <div className={styles.header__user}>
                {user && (
                    <div>
                        <Link href="/post/edit">
                            <Button
                                variant="outlined"
                                size="medium"
                                style={{ textTransform: 'none' }}
                                color="success"
                            >
                                <CreateIcon sx={{marginRight: 1}}/> Viết bài
                            </Button>
                        </Link>
                        <ProfileMenu user={user} />
                    </div>
                )}
                {!user && (
                    <div>
                        <Button size="medium">
                            <Link href="/signin">Đăng nhập</Link>
                        </Button>
                        <Button variant="contained" size="medium">
                            <Link href="/signup">Đăng ký</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
