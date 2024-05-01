'use client'

import { InputText } from "primereact/inputtext"

import { Calendar } from "primereact/calendar";
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
export default function InputsOT({ datos, children }) {



    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    return (<>

        <div className="p-fluid">
            <h5>{datos.tipo_et} / {datos.mp_codigo} - {datos.estado}</h5>
            <div className="p-fluid formgrid grid">

                <div className="field hidden col-12  md:block md:col-3">
                    <label htmlFor="Empresa">Empresa</label>
                    <InputText value={datos.empresa} id="Empresa" required name="Empresa" type="text" />
                </div>
                <div className="field  hidden col-12 md:block md:col-3">
                    <label htmlFor="area">Area</label>
                    <InputText value={datos.tipo_emr} id="area" required name="area" type="text" />
                </div>
                <div className="field col-12  md:col-3">
                    <label htmlFor="ot">Ot</label>
                    <InputText value={datos.mp_codigo} name="ot" id="ot" required />
                </div>
                <div className="field  hidden col-12 md:block md:col-3">
                    <label htmlFor="actividad">Actividad</label>
                    <InputText value={datos.tipo_et} name="actividad" id="actividad" required />
                </div>
                <div className="field  hidden col-12 md:block md:col-3">
                    <label htmlFor="frecuencia">Frecuencia</label>
                    <InputText value={datos.mp_frecuencia} name="frecuencia" id="frecuencia" required />
                </div>
                <div className="field  col-12  md:col-3">
                    <label htmlFor="ejecucion">Fecha Ejecucion Planificada</label>
                    <Calendar dateFormat="dd/mm/yy" disabled={true} value={datos.mp_fecha_ejecucion} locale="es" name="ejecucion" id="ejecucion" required />
                </div>
                <div className="field  col-12  md:col-3">
                    <label htmlFor="last_planner">Last Planner</label>
                    <InputText value={datos.last_planner} name="last_planner" id="last_planner" required />
                </div>
                {datos.apoyo1 !== '' && (
                    <div className="field col-12 md:col-3">
                        <label htmlFor="compilacion_apoyo1">Apoyo 1</label>
                        <InputText value={datos.apoyo1} name="apoyo1" id="apoyo1" required />
                    </div>
                )}
                {datos.apoyo2 !== '' && (
                    <div className="field col-12  md:col-3">
                        <label htmlFor="apoyo2">Apoyo 2</label>
                        <InputText value={datos.apoyo2} name="apoyo2" id="apoyo2" required />
                    </div>
                )}
                {typeof datos.porcentaje_completacion === 'number' && !isNaN(datos.porcentaje_completacion) && datos.porcentaje_completacion !== 0 && (
                    <div className="field col-12  md:col-3">
                        <label htmlFor="porcentaje">Completitud</label>
                        <InputText value={`${datos.porcentaje_completacion}%`} name="porcentaje" id="porcentaje" required />
                    </div>
                )}

               
                {children}


            </div>
        </div>
    </>)
}