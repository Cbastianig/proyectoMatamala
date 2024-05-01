

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { Delete_tiempos_ot } from "@/app/lib/actions/Comunes/ot/actions_tiempos_ot";
export default function Tabla_tiempos({ Data, Loading1, Reload_data, Reload_data_tiempos }) {
    const dt = useRef(null);
    const toast = useRef(null)
    const accept = async (id) => {
        try {
            await Delete_tiempos_ot(id)
            Reload_data()
            Reload_data_tiempos()
            toast.current?.show({
                severity: 'info',
                summary: 'Eliminado',
                detail: 'Se elimino correctamente',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrio un error eliminando el tiempo',
                life: 3000
            });
        }

    };

    const reject = () => {

    };
    const confirm = (event, data) => {

        confirmPopup({
            target: event.currentTarget,
            message: 'Esta seguro de que desea eliminar el registro?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: ' Si ',
            accept: () => accept(data.id),
            reject
        });
    };
    const actionBodyTemplate = (rowData) => {

        return (
            <React.Fragment>
                <ConfirmPopup />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={(event) => { confirm(event, rowData) }} />
            </React.Fragment>
        );
    };

    return (
        <>
            <Toast ref={toast} />
            <DataTable ref={dt} emptyMessage='No se encontraron resultados' value={Data} loading={Loading1}
                dataKey="id" paginator rows={25} rowsPerPageOptions={[25, 50, 75, 100]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} de {last} De un total De {totalRecords} datos">

                <Column field="fecha_inicio" header="Fecha Inicio" sortable ></Column>
                <Column field="fecha_fin" header="Fecha Fin" sortable ></Column>
                <Column header="Acciones" body={actionBodyTemplate} exportable={false} ></Column>
            </DataTable>
        </>
    )


}