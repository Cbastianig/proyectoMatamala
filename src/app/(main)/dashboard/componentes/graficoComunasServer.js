
import { GetAniosDatagrafico, GetDataAniocomuna, GetDataComunas, GetDataComunasAnios } from "@/app/lib/dashboard/actions";


import { getindicadores } from "./graficoServerindicarores";
import GraficoComparacionComunas from "./graficoComparacionComunas";

export default async function GraficoComunasComparacion({ cookieyears, cookieindicators, cookieComunas}) {
   
    const [data, anios, datacomunas, dataAnioComuna] = await Promise.all([GetDataComunasAnios(), GetAniosDatagrafico(), GetDataComunas(), GetDataAniocomuna()]);
    
    
    const yearOptions = anios.map(year => {
        return {
            value: parseInt(year.anios),
            label: year.anios
        };
    });
    const ComunasOptions = datacomunas.map(comuna => {
        return {
            value: comuna.DESCRIPCION_COMUNA.replace(/\s/g, '_').toLowerCase(),
            label: comuna.DESCRIPCION_COMUNA
        };
    });

    const indicadores = await getindicadores()
    const indicatorOptions = Object.values(indicadores).map(indicator => {
        return {
            value: indicator.tipo,
            label: indicator.nombre
        };
    });

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
    return (<>
        <GraficoComparacionComunas dataTablaComunas={dataAnioComuna} cookieComunas={cookieComunas} cookieyears={cookieyears} cookieindicators={cookieindicators} data={data} yearOptions={yearOptions} indicatorOptions={indicatorOptions} meses={meses} ComunasOptions={ComunasOptions}></GraficoComparacionComunas>
    </>)
}
