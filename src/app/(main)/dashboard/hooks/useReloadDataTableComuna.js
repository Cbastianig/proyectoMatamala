
import { GetDataTablaComunas } from "@/app/lib/dashboard/actions";
import { useEffect, useState } from "react";
export function useReloadTablaComunas({ indicador, anios, toast }) {
    const [Data, SetData] = useState(null);
    const [loading, setloading] = useState(true);

    const [reload, setReload] = useState(true);
    const Reload_data = () => {
        setReload(true);
        setloading(true);
    }


    useEffect(() => {
        if (reload) {
            GetDataTablaComunas(anios, indicador).then(
                (data) => {
                    SetData(data);
                    setloading(false);
                    setReload(false);

                })
                .catch((error) => {
                    setloading(false);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrio un Error en el fetching', life: 3000 });
                });
        }
    }, [reload]);

    return { dataTable: Data, loading, Reload_data };
}   