import { useMutation } from '@apollo/client';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, MouseEvent, useState } from 'react';
import { LOG_OUT } from '../../../lib/apollo/auth';
import { IUser } from '../../../lib/interface/user.type';
import userStore from '../../../store/userStore';

export interface IProfileMenuProps {
    user: IUser;
}

export default function ProfileMenu({ user }: IProfileMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const setUser = userStore((state) => state.setUser);
    const [logOutMutate] = useMutation(LOG_OUT);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        await logOutMutate();
        setUser(null);
        router.push('/');
    };
    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar}></Avatar>
                        <ArrowDropDownIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock={true}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link href={`/user/${user.id}`}>
                    <MenuItem>
                        <Avatar sx={{ width: 32, height: 32 }} src={user?.avatar}></Avatar> Trang cá
                        nhân
                    </MenuItem>
                </Link>
                <MenuItem>
                    <ListItemIcon>
                        <BookmarkIcon fontSize="small" />
                    </ListItemIcon>
                    Đã lưu
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Cài đặt tài khoản
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </Menu>
        </Fragment>
    );
}
