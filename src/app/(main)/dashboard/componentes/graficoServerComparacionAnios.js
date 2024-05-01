
import { GetAniosDatagrafico, GetDataAnios } from "@/app/lib/dashboard/actions";

import GraficoComparacionAnio from "./graficoComparacion";
import { getindicadores } from "./graficoServerindicarores";

export default async function GraficoServerComparacionAnios({cookieyears, cookieindicators}) {
 
     const [data, anios] = await Promise.all([GetDataAnios(), GetAniosDatagrafico()]);


    const yearOptions = anios.map(year => {
        return {
            value: parseInt(year.anios),
            label: year.anios
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
    
        <GraficoComparacionAnio meses={meses} data={data} yearOptions={yearOptions} indicatorOptions = {indicatorOptions} cookieyears={cookieyears} cookieindicators={cookieindicators}></GraficoComparacionAnio >
        
    </>)
}

