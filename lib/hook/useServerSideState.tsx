import { useEffect, useState } from "react";

export default function useServerSideState(props: any) {
    const [data, setData] = useState<any>();
    useEffect(() => {
        setData(props);
    }, [props])

    return [data, setData];
}