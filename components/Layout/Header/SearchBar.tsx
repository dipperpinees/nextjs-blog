import styles from './styles.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

export interface ISearchBarProps {
    hideSearchBar: () => void;
    submitSearch: (search: string) => void;
}

export default function SearchBar({ hideSearchBar, submitSearch }: ISearchBarProps) {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        submitSearch(e.target.search.value);
    };

    return (
        <div className={styles.search__bar}>
            <form onSubmit={handleSubmit}>
                <Button>
                    <ArrowBackIosIcon onClick={hideSearchBar} style={{ color: '#000' }}/>
                </Button>
                <input type="text" placeholder="Tìm kiếm bài viết" name="search" />
                <Button type="submit">
                    <SearchIcon style={{ color: 'rgb(135 130 130)' }} type="submit" />
                </Button>
            </form>
        </div>
    );
}
