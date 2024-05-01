'use client'

import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";

import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

import InputFilterDate from "@/componentes/InputFilterDate";
import DefinedsDates from "@/app/services/deficionesFecha";

import { save_range_coockie } from "@/app/services/save_range_Data";
import { saveCoockies } from "@/app/services/saveCookies";

export default function GraficoIndicadores({ data, data_meses, groupOptions, fecha_inicio, fecha_fin, cookieindicadoresChart }) {

    const parsedFechaInicio = new Date(fecha_inicio);
    const parsedfechafin = new Date(fecha_fin);
    const pathname = usePathname();
    const [fechaFiltro, setFechaFiltro] = useState(null);
    const defineds = DefinedsDates()
    const [grupo, setGrupo] = useState(cookieindicadoresChart || groupOptions[0].value)
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const handleclickBuscar2 = (event) => {
        const params = new URLSearchParams(searchParams);
        if (fechaFiltro) {
            save_range_coockie('grafico_indicadores', fechaFiltro.selection)

            params.set('fecha_inicio', fechaFiltro.selection.startDate);
            params.set('fecha_fin', fechaFiltro.selection.endDate);
        } else {
            params.delete('fecha_fin');
            params.delete('fecha_inicio');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const filter_inicio_fecha = [
        {
            startDate: parsedFechaInicio || defineds.startOfLastThirteenMonths,
            endDate: parsedfechafin || defineds.endOfMonth,
            key: 'selection'
        }
    ];




    const [avanceChartOptions, setAvanceChartOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);

    const [chartData, setChartData] = useState({});


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#ffffff';

        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const updatedChartData = {
            labels: data_meses,
            datasets: data.map(item => {
                if (item.grupo === grupo) {
                    if (grupo === 'Otros') {
                        // Si el grupo es "Otros", multiplicar la data por 100

                        const newData = item.data.map(value => value * 100);

                        return {
                            label: item.nombre,
                            data: newData,
                            backgroundColor: item.color,
                            type: 'bar',
                            barPercentage: 0.5
                        };
                    } else {
                        // Si el grupo no es "Otros", no se multiplica la data
                        return {
                            label: item.nombre,
                            data: item.data,
                            backgroundColor: item.color,
                            type: 'bar',
                            barPercentage: 0.5
                        };
                    }
                } else {
                    return null;
                }
            }).filter(item => item !== null)
        };
        setChartData(updatedChartData);

        setAvanceChartOptions({
            maintainAspectRatio: false,
            aspectRatio: 0.6,

            interaction: {
                mode: 'index',
                intersect: false,
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    type: 'logarithmic',

                    grid: {
                        display: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }

                            // Verifica si el grupo es "Otros" antes de añadir el símbolo "%"
                            if (grupo === 'Otros') {
                                label += Math.round(context.parsed.y * 100) / 100 + '%';
                            } else {
                                label += context.parsed.y;
                            }

                            return label;
                        }
                    }
                }
            }
        });
    }, [layoutConfig, grupo])
    const handleChangeValue = (value) => {

        setGrupo(value);
        saveCoockies('grupoChartIndicadores', value)
    }
   
    return (
        <>
            <div className="card-header line-height-4 d-flex justify-content-between">
                <span>Informacion Tipos indicadores </span>
                <div>

                    <Dropdown
                        options={groupOptions}
                        value={grupo}
                        optionLabel="label"
                        optionValue="value"
                        onChange={(e) => { handleChangeValue(e.value) }}>

                    </Dropdown>

                </div>
                <InputFilterDate filter_inicio_fecha={filter_inicio_fecha} nombre_range={'grafico_indicadores'} handleclickBuscar={handleclickBuscar2} setFecha={setFechaFiltro}></InputFilterDate>
            </div>
            <div className="graph">
                <h6 className="mt-4">{grupo}  </h6>
                <Chart id="goodCanvas1"
                    height="600"
                    type="bar"
                    data={chartData}
                    options={avanceChartOptions} >
                </Chart>
            </div>
        </>)

}