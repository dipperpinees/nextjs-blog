import { Box, CircularProgress } from "@mui/material";
import loadingStore from "../../store/loadingStore";
import styles from "./styles.module.scss"

export interface ILoadingProps {
}

export default function Loading (props: ILoadingProps) {
    const isLoading = loadingStore((state) => state.isLoading)
    return (
        <>
        {isLoading && <div className={styles.loading}>
            <CircularProgress />
        </div>}
        </>
  );
}
