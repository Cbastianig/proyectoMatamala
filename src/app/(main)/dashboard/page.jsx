import SkeletonChart from "@/ui/skeleton/chart";
import { Suspense } from "react";
import { cookies } from 'next/headers'

import GraficoServerIndicador from "./componentes/graficoServerindicarores";
import DefinedsDates from "@/app/services/deficionesFecha";
import GraficoServerComparacionAnios from "./componentes/graficoServerComparacionAnios";
import GraficoComunasComparacion from "./componentes/graficoComunasServer";

export const metadata = {
    title: 'Dashboard - Gassur',
}




export default async function Page({ searchParams }) {

    const cookieStore = cookies()


    const hasCookie = cookieStore.has('grafico_indicadores')
    let storefilter = hasCookie ? cookieStore.get('grafico_indicadores') : null
    if (hasCookie) storefilter = JSON.parse(storefilter.value)
    const defends = DefinedsDates();
    const fecha_inicio = storefilter ? new Date(storefilter.startDate) : searchParams.fecha_inicio || defends.startOfLastThirteenMonths;
    const fecha_fin = storefilter ? new Date(storefilter.endDate) : searchParams.fecha_fin || defends.endOfMonth;
    const cookiesConfig = cookieStore.get('CompareChart')
    const cookiesChart = cookiesConfig ? JSON.parse(cookiesConfig.value) : null
    const cookieyears = cookiesChart ? cookiesChart[0].anio : null
    const cookieindicators = cookiesChart ? cookiesChart[0].indicador : null
    const cookieindicadoresChartverify = cookieStore.has('grupoChartIndicadores')

    const cookieindicadoresChart = cookieindicadoresChartverify ? cookieStore.get('grupoChartIndicadores').value : null
    const cookieChartComunas = cookieStore.has('CompareChartComunas') ? cookieStore.get('CompareChartComunas').value : null
    const cookieindicadoresChartComunasParse = cookieChartComunas ? JSON.parse(cookieChartComunas) : null

    const cookieindicadoresChartComunas = cookieindicadoresChartComunasParse ? cookieindicadoresChartComunasParse[0].indicador : null
    const cookieyearsComunas = cookieindicadoresChartComunasParse ? cookieindicadoresChartComunasParse[0].anio : null
    const cookieComunaChartComunas = cookieindicadoresChartComunasParse ? cookieindicadoresChartComunasParse[0].comuna : null



    return (<>
        <div className="grid">
            <div className="col-12 md:col-12">
                <div className="card widget-visitor-graph">
                    {<Suspense fallback={<SkeletonChart altura={725}></SkeletonChart>} key={fecha_inicio + fecha_fin}>
                        <GraficoServerIndicador cookieindicadoresChart={cookieindicadoresChart} fecha_fin={fecha_fin} fecha_inicio={fecha_inicio}></GraficoServerIndicador>
                    </Suspense>}
                </div>
            </div>
            {<div className="col-12 md:col-12">
                <div className="card widget-visitor-graph">
                    <Suspense fallback={<SkeletonChart altura={600}></SkeletonChart>} key={'initial'}>
                        <GraficoServerComparacionAnios cookieyears={cookieyears} cookieindicators={cookieindicators}></GraficoServerComparacionAnios>
                    </Suspense>
                </div>
            </div>}
            {<div className="col-12 md:col-12">
                <div className="card">
                    <Suspense fallback={<SkeletonChart altura={600}></SkeletonChart>} key={'initialComuna'}>
                        <GraficoComunasComparacion cookieComunas={cookieComunaChartComunas} cookieyears={cookieyearsComunas} cookieindicators={cookieindicadoresChartComunas} ></GraficoComunasComparacion>
                    </Suspense>



                </div>


            </div>}

        </div>
    </>


    );
}

