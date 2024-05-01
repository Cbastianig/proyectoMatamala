'use client'

import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "primereact/editor";
import { useFormik } from "formik";
import { ingresa_incidente_ot } from "@/app/lib/actions/Comunes/ot/actions_incidente_ot";

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlotFormatter, { ResizeAction,AlignAction, DeleteAction, ImageSpec } from "quill-blot-formatter-mobile";
import debounce from 'just-debounce-it'
Quill.register("modules/blotFormatter", BlotFormatter);
class CustomImageSpec extends ImageSpec {
    getActions() {
        return [ResizeAction, DeleteAction ];
    }
}

export default function Button_incidente({ disabled, data, toast, ruta }) {


    const form = useRef(null)
    const dialogRef = useRef(null)
    const buttonCerrarRef = useRef(null)
    const [EditDialog, SetEditDialog] = useState(false);
    const [Loading, setLoading] = useState(false)
    const editorElement = useRef(null)
    const showdialog = () => {
        SetEditDialog(true)
    }
    const hideDialog = () => {
        SetEditDialog(false);
    };



    const handleclick = () => {
        form.current.requestSubmit()
    };

    const DataDialogFooter = (
        <React.Fragment>
            <div className="p-dialog-footer">
                <Button label="Cerrar" ref={buttonCerrarRef} icon="pi pi-times" type='button' outlined onClick={hideDialog} />
                <Button visible label="Guardar" icon="pi pi-check" type='button' loading={Loading} onClick={handleclick} />
            </div>
        </React.Fragment>
    );
    const formik = useFormik({
        initialValues: {
            texto: data.descripcion_incidente,
            id_ot: data.id_ot

        },
        validate: (data) => {
            let errors = {};
            if (data.texto) {
                if (data.texto.length < 150) {
                    errors.texto = 'Este campo debe tener al menos 150 caracteres.';
                }
            }
            return errors;
        },
        onSubmit: async (datos_form) => {
            setLoading(true);
            ingresa_incidente_ot(datos_form, ruta).then((result) => {

                toast.current.show({ severity: 'success', summary: 'Bien!', detail: 'Se ingreso correctamente el incidente ', life: 3000 });
                buttonCerrarRef.current.click()
            }).catch((error) => {
                console.error(error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrio un Error desconocido al guardar los datos, Por favor vuelva a intentar ', life: 3000 });
            }).finally(() => {
                setLoading(false);
            });
        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    const modules = {
        blotFormatter: {
            specs: [
                CustomImageSpec,
            ],
            

        }
    }

    const handleChange = (newvalor) => {
        setLoading(true)
        debouncedvalor(newvalor)

    }
   
    const debouncedvalor = useCallback(
        debounce(value => {

            formik.setFieldValue('texto', value)
            setLoading(false)
        }, 500)
        , [formik.setFieldValue]
    )





    return (
        <>
            <Button label={data.id_incidente ? "Ver incidente" : "Notificar incidente"} severity={data.id_incidente ? "danger" : "success"} disabled={disabled} icon="pi pi-clock" onClick={showdialog} className="mr-2" />
            <Dialog
                visible={EditDialog}
                maximizable
                blockScroll
                style={{ width: '50vw' }}
                ref={dialogRef}
                maximized={true}
                header={data.id_incidente ? "Información incidente" : "Notificar Nuevo Incidente"}
                className="p-fluid"
                footer={DataDialogFooter}
                onHide={hideDialog}
            >
                <div className="grid">
                    <div className="col-12">
                        <div className="card">
                            <form action={formik.handleSubmit} ref={form}>
                                <div className="p-fluid formgrid grid">
                                    <div className="field block col-12">


                                        <Editor

                                            readOnly={data.id_incidente ? false : false}
                                            ref={editorElement}
                                            name="texto"
                                            modules={modules}
                                            value={formik.values.texto
                                            }
                                            onTextChange={(e) => { handleChange(e.htmlValue) }}
                                            style={{ height: '100%', minHeight: '30vw' }}
                                        />
                                        {getFormErrorMessage('texto')}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )

}