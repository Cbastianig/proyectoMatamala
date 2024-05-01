
import { useEffect, useState } from "react";


export function useReloadTiempos({ id, Fetch_data }) {
   
    const [Data, SetData] = useState(null);
    const [Loading1, setLoading1] = useState(true);

    const [reload, setReload] = useState(true);
    const Reload_data = () => {
        setReload(true);
        setLoading1(true);
    }
    useEffect(() => {
        if (reload) {
            Fetch_data(id).then(
                (data) => {
                    SetData(data);
                    setLoading1(false);
                    setReload(false);
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, [reload]);
    return { Data, Loading1, Reload_data };
}