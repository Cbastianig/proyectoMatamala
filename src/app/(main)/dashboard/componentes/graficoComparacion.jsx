'use client'
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Chart } from 'primereact/chart';

import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { saveCoockies } from '@/app/services/saveCookies';
export default function GraficoComparacionAnio({ data, meses, yearOptions, indicatorOptions, cookieindicators, cookieyears }) {
    

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [indicador, setIndicador] = useState(cookieindicators || indicatorOptions[0].value);
    const { layoutConfig } = useContext(LayoutContext);

    const [anio, setAnio] = useState(cookieyears && cookieyears.length > 0 ? cookieyears[0] : [yearOptions[yearOptions.length - 2].value, yearOptions[yearOptions.length - 1].value]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        const data_chart = {
            labels: meses,
            datasets: anio.map(item => {
                return {
                    label: data[indicador][item].anio,
                    data: data[indicador][item].data,

                    backgroundColor: getColorByType(item),
                    borderWidth: 2,
                };

            }).filter(item => item !== null)
        };
        setChartData(data_chart);
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {

                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            },
          
            
        };


        setChartOptions(options);
    }, [anio, indicador, layoutConfig]);
    const handleChange = useCallback((value, tipo) => {
        const updatedCookies = [];
        if (tipo === 'i') {
            setIndicador(value);
            updatedCookies.push({ indicador: value, anio: [...anio] });
        } else {
            //ordenar del año mas antiguo al mas nuevo
            setAnio(value.sort((a, b) => a - b));
            updatedCookies.push({ indicador: indicador, anio: [value] });
        }
        //tambien se deben guardar los indicadores en esta coockie

        saveCoockies('CompareChart', JSON.stringify(updatedCookies));
    }, []);


    return (<>
        <div className="card-header line-height-4 d-flex justify-content-between">
            <span>Comparacion de indicadores por año</span>
            <div>
                <Dropdown
                    options={indicatorOptions}
                    value={indicador}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => { handleChange(e.value, 'i') }}>
                </Dropdown>
            </div>
            <MultiSelect value={anio}
                onChange={(e) => handleChange(e.value, 'a')}
                options={yearOptions}
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione años a comparar"

                className="w-full md:w-20rem" />

        </div>
        <div className="graph">
            <Chart type="bar" data={chartData} options={chartOptions} />

        </div>
        


    </>)
}

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
    if(!anio[year]){
        anio[year] = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    return anio[year] || '#000000'; // Si el tipo no está en el objeto, devuelve un color predeterminado
};