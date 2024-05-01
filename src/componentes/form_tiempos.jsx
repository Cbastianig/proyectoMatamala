
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { useFormik } from "formik";
import { classNames } from "primereact/utils";

import { Toast } from "primereact/toast";
import { Guardar_tiempos_ot } from "@/app/lib/actions/Comunes/ot/actions_tiempos_ot";



export default function Form_tiermpos_ot({ id_ot, setLoading, form, Reload_data, Reload_data_tiempos }) {

    const toast = useRef(null);
    const calendar_1 = useRef(null);
    const calendar_2 = useRef(null);
    


    const formik = useFormik({
        initialValues: {
            fecha_inicio: null,
            fecha_fin: null,
            id_ot: id_ot
        },
        validate: (data) => {
            let errors = {};
            if (!data.fecha_inicio) {
                errors.fecha_inicio = 'Este campo es obligatorio.';
            }
            if (!data.fecha_fin) {
                errors.fecha_fin = 'Este campo es obligatorio.';
            }

            return errors;
        },
        onSubmit: async (data_form) => {
           
           
            setLoading(true);
            Guardar_tiempos_ot(data_form).then(async (result) => {
                setLoading(false);
                Reload_data();
                Reload_data_tiempos()
                formik.resetForm()

            }).catch((error) => {
                setLoading(false);

                console.error(error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrio un Error desconocido al guardar los datos, Por favor vuelva a intentar ', life: 3000 });
            });
        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });
    const handleButtonClick = () => {
        calendar_1.current.hide();
        calendar_2.current.hide();

    }
    const template = () => {

        return (
            <React.Fragment>
                <div className="p-datepicker-buttonbar">
                    <button
                        aria-label="Limpiar"
                        className="p-button-secondary p-button-text p-button p-component button_cierre_calendar"
                        type="button"
                        data-pc-name="button"
                        data-pc-section="root"
                        onClick={handleButtonClick}
                    >
                        <span className="p-button-label p-c" data-pc-section="label">
                            Cerrar

                        </span>
                        <span
                            role="presentation"
                            aria-hidden="true"
                            className="p-ink"
                            data-pc-name="ripple"
                            data-pc-section="root"
                            style={{ height: '67.3px', width: '67.3px' }}
                        ></span>
                    </button>
                </div>


            </React.Fragment>
        );
    };
    return (<>
        <Toast ref={toast}></Toast>
        <div className="grid" >
            <div className="col-12 ">
                <div className="card">
                    <form action={formik.handleSubmit} ref={form}>
                        <div className="p-fluid formgrid grid">
                            <div className="field block col-12">
                                <label htmlFor="inicio">Fecha inicio</label>
                                <Calendar footerTemplate={template} ref={calendar_1} value={formik.values.fecha_inicio} onInput={close} onChange={(e) => { formik.setFieldValue('fecha_inicio', e.value); }} locale="es" showTime hourFormat="24" dateFormat="dd/mm/yy" className={classNames({ 'p-invalid': isFormFieldInvalid('fecha_inicio') })} />
                                {getFormErrorMessage('fecha_inicio')}
                            </div>
                            <div className="field block col-12">
                                <label htmlFor="fin">Fecha fin</label>
                                <Calendar footerTemplate={template} ref={calendar_2} value={formik.values.fecha_fin} onInput={close} onChange={(e) => { formik.setFieldValue('fecha_fin', e.value); }} locale="es" showTime hourFormat="24" dateFormat="dd/mm/yy" className={classNames({ 'p-invalid': isFormFieldInvalid('fecha_fin') })} />
                                {getFormErrorMessage('fecha_fin')}
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    </>)
} 
