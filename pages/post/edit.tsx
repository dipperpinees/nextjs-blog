import { useMutation } from '@apollo/client';
import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CREATE_POST } from '../../lib/apollo/post';
import { categoriesList } from '../../lib/category';
import userStore from '../../store/userStore';

const QuillEditor = dynamic(() => import('../../components/QuillEditor'), {
    ssr: false,
});

export default function EditPost() {
    const [content, setContent] = useState<string>('');
    const [createPostMutate] = useMutation(CREATE_POST);
    const router = useRouter();
    const user = userStore((state) => state.user);

    const handleSubmitPost = async (e: any) => {
        e.preventDefault();
        try {
            await createPostMutate({
                variables: {
                    postData: {
                        title: e.target.title.value,
                        content,
                        categoryId: Number(e.target.category.value),
                    },
                },
            });

            router.push(`/user/${user?.id}`);
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <div className="post-edit">
            <form className="post-edit-topbar" onSubmit={handleSubmitPost}>
                <TextField
                    label="Tiêu đề"
                    size="small"
                    variant="standard"
                    name="title"
                    className="post-edit-topbar-title"
                    required
                />
                <FormControl
                    size="small"
                    className="post-edit-topbar-category"
                >
                    <InputLabel id="category-select">Chủ đề</InputLabel>
                    <Select
                        labelId="category-select"
                        id="category-select"
                        label="Chủ đề"
                        name="category"
                        required
                    >
                        {categoriesList.map(({ id, title }) => (
                            <MenuItem key={id} value={id}>
                                {title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" size="small" type="submit" startIcon={<SendIcon />}>
                    Xuất bản
                </Button>
            </form>
            <QuillEditor setContent={(content: string) => setContent(content)} />
        </div>
    );
}
