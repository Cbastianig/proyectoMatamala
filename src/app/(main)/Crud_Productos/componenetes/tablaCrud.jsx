'use client'



import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import useTabla from "../hooks/useTabla";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DeleteDataProductos, createnewRow, editData } from "@/app/lib/dashboard/actions";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";


export default function TablaCrud({ data }) {
    const toast = useRef(null);
    const dt = useRef(null);

    const { header, leftToolbarTemplate, actionBodyTemplate, onGlobalFilterChange, filters, DeletedialogFooter, DataDialogFooter, hideDeleteDatoDialog, hideDialog, DeleteDialog, Dato, editDialog, submitted, SetDato } = useTabla({ toast })
    const onInputChange = async (e, name) => {
        const val = (e.target && e.target.value) !== undefined ? e.target.value : '';
        let _Dato = { ...Dato };
        _Dato[`${name}`] = val;
        SetDato(_Dato);
    };



    return (<>

        <Toast ref={toast} />
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
            <DataTable ref={dt} emptyMessage='No se encontraron resultados' value={data}
                dataKey="id" paginator rows={25} rowsPerPageOptions={[25, 50, 75, 100]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} de {last} De un total De {totalRecords} datos" filters={filters} header={header}>

                <Column field="nombre" header="Nombre" sortable ></Column>
                <Column field="cantidad" header='Cantidad' sortable  ></Column>
                <Column field="fecha_creacion" header="Fecha Creacion" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="descripcion" header='Descripcion' sortable ></Column>

                <Column field="cantidad_vendidos" header="Cantidad Vendidos" sortable  ></Column>
                <Column header="Acciones" body={actionBodyTemplate} exportable={false} ></Column>
            </DataTable>

            <Dialog visible={editDialog} blockScroll={true} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Nueva ruta" modal className="p-fluid" footer={DataDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="nombre" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="nombre" value={Dato.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !Dato.nombre })} />

                    {submitted && !Dato.nombre && <small className="p-error">Este campo es obligatorio.</small>}

                </div>
                <div className="field">
                    <label htmlFor="cantidad_compras" className="font-bold">
                        Cantidad De Compras
                    </label>
                    <InputNumber keyfilter="cantidad_compras" id="cantidad_compras" value={Dato.cantidad_compras} onValueChange={(e) => onInputChange(e, 'cantidad_compras')} required className={classNames({ 'p-invalid': submitted && !Dato.cantidad_compras  })} />
                    {submitted && !Dato.cantidad_compras && Dato.cantidad_compras !== 0 && <small className="p-error">Este campo es obligatorio.</small>}

                </div>



                <div className="field">
                    <label htmlFor="cantidad_vendidos" className="font-bold">
                        Cantidad Vendidos
                    </label>
                    <InputNumber keyfilter="cantidad_vendidos" id="cantidad_vendidos" value={Dato.cantidad_vendidos} onValueChange={(e) => onInputChange(e, 'cantidad_vendidos')} required className={classNames({ 'p-invalid': submitted && !Dato.cantidad_vendidos  })} />
                    {submitted && !Dato.cantidad_vendidos && Dato.cantidad_vendidos !== 0 && <small className="p-error">Este campo es obligatorio.</small>}

                </div>
                <div className="field">
                    <label htmlFor="precio_unitario_compra" className="font-bold">
                        Precio Unitario Compra
                    </label>
                    <InputNumber keyfilter="precio_unitario_compra" id="precio_unitario_compra" value={Dato.precio_unitario_compra} onValueChange={(e) => onInputChange(e, 'precio_unitario_compra')} required className={classNames({ 'p-invalid': submitted && !Dato.precio_unitario_compra })} />
                    {submitted && !Dato.precio_unitario_compra && Dato.precio_unitario_compra !== 0 && <small className="p-error">Este campo es obligatorio.</small>}

                </div>

                <div className="field">
                    <label htmlFor="precio_unitario_venta" className="font-bold">
                        Precio Unitario Venta
                    </label>
                    <InputNumber keyfilter="precio_unitario_venta" id="precio_unitario_venta" value={Dato.precio_unitario_venta} onValueChange={(e) => onInputChange(e, 'precio_unitario_venta')} required className={classNames({ 'p-invalid': submitted && !Dato.precio_unitario_venta  })} />
                    {submitted && !Dato.precio_unitario_venta && Dato.precio_unitario_venta !== 0 && <small className="p-error">Este campo es obligatorio.</small>}

                </div>

                <div className="field">
                    <label htmlFor="fecha_Compra" className="font-bold">
                        Fecha Compra
                    </label>
                    <Calendar value={Dato.fecha_Compra} onChange={(e) => onInputChange(e, 'fecha_Compra')} className={classNames({ 'p-invalid': submitted && !Dato.fecha_Compra  })} />
                    {submitted && !Dato.fecha_Compra && Dato.fecha_Compra !== 0 && <small className="p-error">Este campo es obligatorio.</small>}

                </div>
            </Dialog>



            <Dialog visible={DeleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={DeletedialogFooter} onHide={hideDeleteDatoDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {Dato && (
                        <span>
                            Estas seguro de que deseas eliminar el <b>{Dato.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div >



    </>

    );
}

