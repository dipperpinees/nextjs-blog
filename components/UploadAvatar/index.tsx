import { useMutation } from '@apollo/client';
import { Avatar, Button, Divider } from '@mui/material';
import { useRef, useState } from 'react';
import { UPDATE_AVATAR } from '../../lib/apollo/user';
import loadingStore from '../../store/loadingStore';
import userStore from '../../store/userStore';
import styles from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';

export interface IUploadAvatarProps {
    onClose: () => void;
}

export default function UploadAvatar({ onClose }: IUploadAvatarProps) {
    const [avatar, setAvatar] = useState<any>();
    const inputFile = useRef<any>(null);
    const user = userStore((state) => state.user);
    const setUser = userStore((state) => state.setUser);
    const [uploadAvatar] = useMutation(UPDATE_AVATAR);
    const setIsLoading = loadingStore((state) => state.setIsLoading);

    const handleChangeImage = (e: any) => {
        if (!e.target.files[0]) return;
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const handleUploadAvatar = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const {
                data: { UpdateAvatar: avatar },
            } = await uploadAvatar({
                variables: {
                    file: e.target.avatar.files[0],
                },
            });

            setUser({ ...user, avatar });
            onClose();
        } catch (e: any) {
            console.log(e.message);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <div className={styles.overlay} onClick={() => onClose()} />
            <form onSubmit={handleUploadAvatar} className={styles.upload}>
                <h3>Cập nhật ảnh đại diện</h3>
                <section>
                    {avatar ? (
                        <Avatar
                            src={avatar}
                            style={{ width: 120, height: 120 }}
                            onClick={() => inputFile.current.click()}
                        />
                    ) : (
                        <Button variant="contained" onClick={() => inputFile.current.click()}>
                            Upload
                        </Button>
                    )}
                </section>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={inputFile}
                    name="avatar"
                    onChange={handleChangeImage}
                    accept="image/*"
                />
                {avatar && (
                    <Button variant="contained" type="submit">
                        Đồng ý
                    </Button>
                )}

                <CloseIcon className={styles.close} onClick={() => onClose()} />
            </form>
        </div>
    );
}
