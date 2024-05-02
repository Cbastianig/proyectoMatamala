import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DeleteDataProductos, createnewRow, editData } from "@/app/lib/dashboard/actions";
export default function useTabla({ toast}) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }

    });
    const [submitted, setSubmitted] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [DeleteDialog, SetDeleteDialog] = useState(false);
    const onGlobalFilterChange = (e) => {

        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Trazado</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
            </span>
        </div>
    );
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />

            </div>
        );
    };
    const confirmDeleteDato = (Dato) => {
        SetDato(Dato);
        SetDeleteDialog(true);
    };
    const actionBodyTemplate = (rowData) => {

        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDato(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDato(rowData)} />
            </>
        );
    };
    const saveDatos = () => {
        setSubmitted(true);
        setLoading(true);

        const resultados = validarParametros([Dato.nombre, Dato.cantidad_compras, Dato.cantidad_vendidos, Dato.precio_unitario_venta, Dato.cantidad_compras, Dato.precio_unitario_compra, Dato.categoria])
        if (!resultados) {
            setLoading(false);
            return;
        }
        if (Dato.id) {
            // Editar

            editData(Dato).then((res) => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Dato Actualizado', life: 3000 });
                setEditDialog(false);

            }).catch((error) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el dato', life: 3000 });
            });

        } else {
            createnewRow(Dato).then((res) => {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Dato Creado', life: 3000 });
                setEditDialog(false);
            }).catch((error) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear el dato', life: 3000 });
            });
        }

        setSubmitted(false);
        setLoading(false);


    };
    const hideDeleteDatoDialog = () => {
        SetDeleteDialog(false);
    };
    const deleteDato = () => {
        setLoading(false);
        DeleteDataProductos(Dato.id).then((res) => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Dato Eliminado', life: 3000 });
            SetDeleteDialog(false);
           
        }).catch((error) => {
            console.log(error)
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el dato', life: 3000 });
        });

    };

    const DeletedialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDatoDialog} />
            <Button label="Yes" icon="pi pi-check" loading={loading} severity="danger" onClick={deleteDato} />
        </>
    );
    const hideDialog = () => {
        setSubmitted(false);
        setEditDialog(false);
    };

    const DataDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" type='button' outlined onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" type='button' loading={loading} onClick={saveDatos} />
        </>
    );




    function validarParametros(arrayParametros) {

        // Asegurarse de que se haya proporcionado un array
        if (!Array.isArray(arrayParametros)) {
            return false;
        }

        // Validar que ningún elemento del array sea null, undefined, una cadena vacía o solo espacios
        for (let i = 0; i < arrayParametros.length; i++) {
            if (arrayParametros[i] === null || arrayParametros[i] === undefined || arrayParametros[i] === "") {
                return false;
            }
        }

        // Puedes agregar más validaciones según tus requisitos

        // Si pasa todas las validaciones, devolver true
        return true;
    }

    
    const openNew = () => {

        SetDato(datos_vacio);
        setEditDialog(true);
        setSubmitted(false);
    }

    let datos_vacio = {
        id: null,
        nombre: '',
        cantidad_vendidos: null,
        precio_unitario_venta: null,
        fecha_Compra: null,
        cantidad_compras: null,
        precio_unitario_compra: null,
        categoria: null
    };


    const [Dato, SetDato] = useState(datos_vacio);

    

    const editDato = (Dato) => {

        SetDato({ ...Dato });
        setEditDialog(true);


    };






    return { header, leftToolbarTemplate, actionBodyTemplate, onGlobalFilterChange, filters, DeletedialogFooter, DataDialogFooter, hideDeleteDatoDialog, hideDialog, DeleteDialog, Dato, editDialog ,submitted, SetDato}
}