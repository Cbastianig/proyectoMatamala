"use client"


import { LayoutContext } from "@/layout/context/layoutcontext";

import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { use, useContext, useEffect, useState } from "react"

export default function GraficoTotalventas({ yearsOptions, fetchData }) {


    const [DistribucionChartOptions, setDistribucionChartOptions] = useState({})
    const layoutConfig = useContext(LayoutContext);
    const pre = yearsOptions[yearsOptions?.length - 1]
    
    const [year, setSelectedear] = useState(pre.value)
    const [dataYear, setDataYear] = useState([])
    const [newdata, setNewdata] = useState({})
    const [porcentajes, setPorcentajes] = useState([])
    const [optionFilter, setOptionFilter] = useState('cantidad_vendidos')
    const optionsFilter = [{ name: 'Cantidad Vendidos', value: 'cantidad_vendidos' }, { name: 'Cantidad Comprados', value: 'cantidad_compras' }]
    useEffect(() => {
        fetchData(year,optionFilter).then((data) => {
            setDataYear(data)

        })


    }, [year,optionFilter])

    useEffect(() => {

        setNewdata({
            labels: ['MECANICO', 'ESTRUCTURAS', 'ELECTRICO'],
            datasets: [
                {


                    data: dataYear.map(item => item.total),
                    backgroundColor: ['#FC6161', '#0f8bfd', '#EC4DBC'],
                    hoverBackgroundColor: ['#FC6161', '#0f8bfd', '#EC4DBC'],
                    borderColor: 'transparent'
                }
            ]
        })
       
        let suma = 0;
        const total = dataYear.map(item => {

            suma = parseInt(item.total) + suma

        })
        setPorcentajes(dataYear.map(item => (item.total / suma * 100).toFixed(2)))
    }, [dataYear])




    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#ffffff';
        //transforma el numero del toolti a moneda
        setDistribucionChartOptions({

            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        });
        
    }, [])



    const optionFilterName = optionsFilter.find((item) => item.value === optionFilter)?.name
    
    
    return (<>
        
        <div className="font-medium line-height-4">{optionFilterName} total por Categoria</div>
        <div className="flex justify-content-between">
                <Dropdown
                    options={yearsOptions}
                    value={year}
                    optionLabel="name"
                    optionValue="value"
                    onChange={(e) => { setSelectedear(e.value) }}>
                </Dropdown>

                <Dropdown
                    options={optionsFilter}
                    value={optionFilter}
                    optionLabel="name"
                    optionValue="value"
                    onChange={(e) => { setOptionFilter(e.value) }}>
                </Dropdown>

            </div>
        <div className="country-graph">
            <div className="flex justify-content-center">
                <Chart type="doughnut" id="country-chart" data={newdata} options={DistribucionChartOptions} style={{ position: 'relative', width: '75%' }}></Chart>
            </div>
        </div>
        <div className="country-content">
            <ul className="m-0 p-0 border-none outline-none list-none">
                <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                    <div className="flex justify-content-between align-items-center">
                        <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--red-400)', boxShadow: '0px 0px 10px rgba(252, 97, 97, 0.3)' }}></div>
                        <span>MECANICO</span>
                    </div>
                    <span>{porcentajes[0] || 0}%</span>
                </li>
                <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                    <div className="flex justify-content-between align-items-center">
                        <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: '#0f8bfd', boxShadow: '0px 0px 10px rgba(0, 208, 222, 0.3)' }}></div>
                        <span>ESTRUCTURAS</span>
                    </div>
                    <span>{porcentajes[1] || 0}%</span>
                </li>
                <li className="flex justify-content-between align-items-center py-2 border-bottom-1 surface-border">
                    <div className="flex justify-content-between align-items-center">
                        <div className="w-2rem h-2rem border-round mr-2" style={{ backgroundColor: 'var(--purple-400)', boxShadow: '0px 0px 10px rgba(135, 62, 254, 0.3)' }}></div>
                        <span>ELECTRICO</span>
                    </div>
                    <span>{porcentajes[2] || 0}%</span>
                </li>


            </ul>
        </div>
    </>)
}