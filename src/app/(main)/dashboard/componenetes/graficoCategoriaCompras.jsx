"use client";

import { Chart } from "primereact/chart";
import { MultiSelect } from "primereact/multiselect";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";



export default function GraficoCategoriaCompras({ data, datayear, categoraisOptions }) {

    const [categoria, setCategoria] = useState([1, 2, 3])
    const [chartData, setChartData] = useState({})
    const [avanceChartOptions, setAvanceChartOptions] = useState({})
    const layoutConfig = useContext(LayoutContext);
    //get years from the datayear.anio_compra and create a array of years the format is 'YYYY' willout duplicate years
    const years = [...new Set(datayear.map((item) => item.anio_compra))].map((item) => parseInt(item))
    const newdata = {}
    datayear.forEach(element => {

        const categoria = element.categoria;
        const year = element.anio_compra
        const total = element.total

        if (!newdata[year]) {
            newdata[year] = [];
        }
        if (!newdata[year]) {
            newdata[year] = [];
        }
        newdata[year].push({ categoria: categoria, total: total });

    });

    //te labels of the chart are the name of the categories
    const labels = categoraisOptions.filter((item) => categoria.includes(item.value)).map((item) => item.name)

    const orderYears = years.sort((a, b) => a - b)
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#ffffff';
        setChartData(
            {
                labels: labels,
                datasets: orderYears.map((year) => {
                    if (newdata[year]) {
                        const data = newdata[year].filter((item) => categoria.includes(item.categoria)).map((item) => item.total)
                        return {
                            label: year,
                            data: data,
                            backgroundColor: getColorByType(year),
                            borderColor: getColorByType(year),
                            borderWidth: 1
                        }
                    }
                })

            }
        )

        setAvanceChartOptions({
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: textColor
                    },

                    grid: {
                        display: false
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        display: false
                    }
                }
            }
        });
    }, [categoria])
    return (

        <>
            <div className="card-header line-height-4 d-flex justify-content-between">
                <div> Cantidad de Adquisiciones Por año</div>
                <div>
                    <MultiSelect
                        id="categoria"
                        options={categoraisOptions}
                        value={categoria}
                        optionLabel="name"
                        optionValue="value"
                        onChange={(e) => { setCategoria(e.value); }}>

                    </MultiSelect>


                </div>
            </div>
            <div className="graph">

                <Chart id="goodCanvas1"
                    height="366"
                    type="bar"
                    data={chartData}
                    options={avanceChartOptions} >
                </Chart>
            </div>

        </>

    )
}
// function que debuelve el colores dependiendo del año que llege
const getColorByType = (year) => {
    //apartir del 2028 en adelante el color se genear de forma aleatoria
    const anio = {
        2018: '#FC6161',
        2019: '#0f8bfd',
        2020: '#873efe',
        2021: '#ff7c00',
        2022: '#800040',
        2023: '#7fffff',
        2024: '#f75e25',



    };
    if (!anio[year]) {
        anio[year] = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    return anio[year] || '#000000'; // Si el tipo no está en el objeto, devuelve un color predeterminado
};