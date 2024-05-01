import { useEffect, useState } from "react";
import { Fetch_Tiempos_ot } from "@/app/lib/actions/Comunes/ot/actions_tiempos_ot";
export default function useReloadTiemposOt({ id_ot }) {
    const [DataTiempos, setDataTiempos] = useState([])
    const [reloadTiempos, setReloadTiempos] = useState(true)
    const Reload_data_tiempos = () => {
        setReloadTiempos(true);
    }
    useEffect(() => {
        if (reloadTiempos) {
            Fetch_Tiempos_ot(id_ot).then(
                (data) => {
                    setDataTiempos(data);
                    setReloadTiempos(false)
                    

                })
                .catch((error) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrio un Error en el fetching', life: 3000 });
                });
        }

    }, [reloadTiempos]);


    return ({ Reload_data_tiempos, DataTiempos })


}