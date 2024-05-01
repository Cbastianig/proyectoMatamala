'use client'

import { Button } from "primereact/button"
import { useReloadTiempos } from "@/hooks/useReloadGlobal";
import { Dialog } from 'primereact/dialog';
import React, { useRef, useState } from "react";
import Tabla_tiempos from "./Tabla_tiempos";
import Form_tiermpos_ot from "./form_tiempos";
import { Fetch_Tiempos_ot } from "@/app/lib/actions/Comunes/ot/actions_tiempos_ot";
export default function Button_agrega_tiempos({ id_ot, disabled, ref_but_tiempos, Reload_data_tiempos }) {
    const form = useRef(null)
    const [Edit_Dialog, SetEdit_Dialog] = useState(false);
    const { Data, Loading1, Reload_data } = useReloadTiempos({ id: id_ot, Fetch_data: Fetch_Tiempos_ot })
    const [Loading, setLoading] = useState(false);

    const Agrega_tiempo = () => {
        SetEdit_Dialog(true)
    }
    const hideDialog = () => {
        SetEdit_Dialog(false);
    };
    const handleclick = () => {
        form.current.requestSubmit()
    };
    
    const DataDialogFooter = (
        <React.Fragment>
            <div className="p-dialog-footer">
                <Button label="Cerrar" icon="pi pi-times" type='button' outlined onClick={hideDialog} />
                <Button label="Guardar" icon="pi pi-check" type='button' loading={Loading} onClick={handleclick} />
            </div>
        </React.Fragment>
    );

    return (
        <>
            <Button label="Agregar Tiempos" ref={ref_but_tiempos} disabled={disabled} icon="pi pi-clock" onClick={Agrega_tiempo} className="mr-2" />
            <Dialog visible={Edit_Dialog} blockScroll={true} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Tiempos involucrados" modal className="p-fluid" footer={DataDialogFooter} onHide={hideDialog}>
                <Form_tiermpos_ot Reload_data_tiempos={Reload_data_tiempos}  form={form}  Reload_data={Reload_data} id_ot={id_ot} Loading={Loading} setLoading={setLoading}></Form_tiermpos_ot>
                <Tabla_tiempos Reload_data_tiempos={Reload_data_tiempos}  Data={Data} Loading1={Loading1} Reload_data={Reload_data} ></Tabla_tiempos>
            </Dialog>
        </>
    )

}