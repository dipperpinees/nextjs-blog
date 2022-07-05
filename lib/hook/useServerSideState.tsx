import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useServerSideState(props: any) {
    const [data, setData] = useState<any>();
    
    useEffect(() => {
        setData(props);
    }, [])

    return [data, setData];
}