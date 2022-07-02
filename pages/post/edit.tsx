import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import dynamic from 'next/dynamic';
import SendIcon from '@mui/icons-material/Send';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../lib/apollo/post';
import { categoriesList } from '../../lib/category';
import userStore from '../../store/userStore';
import { useRouter } from 'next/router';

const QuillEditor = dynamic(() => import('../../components/QuillEditor'), {
    ssr: false,
});

export default function EditPost() {
    const [content, setContent] = useState<string>('');
    const [createPostMutate] = useMutation(CREATE_POST);
    const user = userStore((state) => state.user);
    const router = useRouter();

    //if user's not logged in, navigate to login page
    useEffect(() => {
        if(!user) {
            router.push("/signin")
        }
    }, [user])

    const handleSubmitPost = async (e: any) => {
        e.preventDefault();
        try {
            const data = await createPostMutate({
                variables: {
                    postData: {
                        title: e.target.title.value,
                        content,
                        categoryId: Number(e.target.category.value),
                    },
                },
            });
    
            console.log(data);
        } catch (e:any) {
            console.log(e.message)
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
                    style={{ flex: 1, marginRight: 32 }}
                    required
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="category-select">Chủ đề</InputLabel>
                    <Select
                        labelId="category-select"
                        id="category-select"
                        label="Chủ đề"
                        name="category"
                        required
                    >
                        {categoriesList.map(({id, title}) => (
                            <MenuItem key={id} value={id}>{title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    startIcon={<SendIcon />}
                    style={{ backgroundColor: blue['A200'] }}
                >
                    Xuất bản
                </Button>
            </form>
            <QuillEditor setContent={(content: string) => setContent(content)} />
        </div>
    );
}
