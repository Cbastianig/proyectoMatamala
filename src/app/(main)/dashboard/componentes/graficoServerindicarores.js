import { getDataOficioSec, getmesesOficioSec } from "@/app/lib/dashboard/actions";
import GraficoIndicadores from "./graficoIndicadores";

export default async function GraficoServerIndicador({ fecha_inicio, fecha_fin, cookieindicadoresChart }) {


    const [data, data_meses] = await Promise.all([getDataOficioSec(fecha_inicio, fecha_fin), getmesesOficioSec(fecha_inicio, fecha_fin)]);
    let meses = [];
    data_meses.forEach(element => {
        meses.push(element.mes_actual)
    });
    const indicadores = getindicadores();
    const groupedData = {};
    data.forEach(entry => {
        if (!groupedData[entry.tipo]) {
            groupedData[entry.tipo] = [];
        }
        groupedData[entry.tipo].push(entry.indicador);
    });
    // Crear un array de objetos para cada tipo
    const result = Object.keys(groupedData).map(tipo => ({
        tipo,
        data: groupedData[tipo],
        ...indicadores[tipo] // Agregar datos adicionales del indicador
    }));
    const groupCounts = {};
    const groupOptions = Object.values(indicadores).reduce((accumulator, current) => {
        if (!groupCounts[current.grupo]) {
            groupCounts[current.grupo] = 1;
            accumulator.push({ label: current.grupo, value: current.grupo });
        } else {
            groupCounts[current.grupo]++;
        }
        return accumulator;
    }, []);

    return (<>
        <GraficoIndicadores fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} data={result} data_meses={meses} groupOptions={groupOptions} cookieindicadoresChart={cookieindicadoresChart}></GraficoIndicadores>
    </>)
}


export function getindicadores() {

    return {
        "i1": {
            "tipo": "i1",
            "grupo": "Indicador general",
            "nombre": "Emergencias cada 1000 clientes",
            "color": '#FC6161'
        },
        "i2": {
            "tipo": "i2",
            "grupo": "Indicador general",
            "nombre": "Emergencias con perdida de hermeticidad",
            "color": '#0f8bfd'
        },
        "i3": {
            "tipo": "i3",
            "grupo": "Indicador general",
            "nombre": "Número de accidentes e incidentes",
            "color": '#873efe'

        },
        "i4": {
            "tipo": "i4",
            "grupo": "Indicador instalaciones tipo 1",
            "nombre": "Número de emergencias instalaciones tipo 1 por 100 km",
            "color": '#FC6161'
        },
        "i5": {
            "tipo": "i5",
            "grupo": "Indicador instalaciones tipo 1",
            "nombre": "Número de emergencias tipo 1 con perdida de hermeticidad por 100 km",
            "color": '#0f8bfd'
        },
        "i6": {
            "tipo": "i6",
            "grupo": "Indicador instalaciones tipo 1",
            "nombre": "Número de emergencias tipo 1 intervención de terceros por 100 km",
            "color": '#873efe'
        },
        "i7": {
            "tipo": "i7",
            "grupo": "Indicador instalaciones tipo 2",
            "nombre": "Número de emergencias instalaciones tipo 2 por 1000 clientes",
            "color": '#FC6161' // Color added
        },
        "i8": {
            "tipo": "i8",
            "grupo": "Indicador instalaciones tipo 2",
            "nombre": "Número de emergencias tipo 2 con perdida de hermeticidad por 1000 clientes",
            "color": '#0f8bfd' // Color added
        },
        "i9": {
            "tipo": "i9",
            "grupo": "Indicador instalaciones tipo 2",
            "nombre": "Número de emergencias tipo 2 intervención de terceros por 1000 clientes",
            "color": '#873efe' // Color added
        },
        "i10": {
            "tipo": "i10",
            "grupo": "Indicador instalaciones tipo 3",
            "nombre": "Número de emergencias instalaciones tipo 3 por 1000 clientes",
            "color": '#FC6161' // Color added
        },
        "i11": {
            "tipo": "i11",
            "grupo": "Indicador instalaciones tipo 3",
            "nombre": "Número de emergencias tipo 3 con perdida de hermiticidad por 1000 clientes",
            "color": '#0f8bfd' // Color added
        },
        "i12": {
            "tipo": "i12",
            "grupo": "Otros",
            "nombre": "Patrullaje- inspeción/ emergencias",
            "color": '#873efe' // Color added
        },
        "i13": {
            "tipo": "i13",
            "grupo": "Otros",
            "nombre": "Falsa alarma/emergencia",
            "color": '#FC6161' // Color added
        }
    };
}