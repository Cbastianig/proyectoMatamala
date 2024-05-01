'use client'
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Chart } from 'primereact/chart';

import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { saveCoockies } from '@/app/services/saveCookies';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { usePaginator } from '@/hooks/usePaginator';
import { useReloadTablaComunas } from '../hooks/useReloadDataTableComuna';

import { Toast } from 'primereact/toast';
import { ScrollTop } from 'primereact/scrolltop';
import { Tag } from 'primereact/tag';
import debounce from 'just-debounce-it'


export default function GraficoComparacionComunas({ dataTablaComunas, data, meses, yearOptions, indicatorOptions, cookieindicators, cookieyears, ComunasOptions, cookieComunas }) {
    const [chartData, setChartData] = useState({});
    const dt = useRef(null);
    const toast = useRef(null);
    const [chartOptions, setChartOptions] = useState({});
    const [indicador, setIndicador] = useState(cookieindicators || indicatorOptions[0].value);
    const [comuna, setComuna] = useState(cookieComunas || ComunasOptions[0].value);
    const { layoutConfig } = useContext(LayoutContext);
    const [DistribucionChartOptions, setDistribucionChartOptions] = useState(null);
    const [anio, setAnio] = useState(cookieyears && cookieyears.length > 0 ? cookieyears[0] : [yearOptions[yearOptions.length - 2].value, yearOptions[yearOptions.length - 1].value]);
    const [doughnut, setDoughnut] = useState(null);
    const { dataTable, loading, Reload_data } = useReloadTablaComunas({ indicador, anios: anio, toast });
    const { first, rows, onPage, resetFirstState } = usePaginator({})

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data_chart = {
            labels: [...meses],
            datasets: anio.map(item => {
                if (!data[indicador][comuna][item]) {
                    return null;
                }
                return {
                    label: data[indicador][comuna][item].anio,
                    data: data[indicador][comuna][item].data,

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
    }, [layoutConfig, anio, indicador, comuna]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#ffffff';
        
        const ordenatedanios= [...anio].sort((a, b) => b - a)
        
     
        
        const doughnutData = {
            labels: ComunasOptions.map(comuna => comuna.label),
            datasets: ordenatedanios.map(anio => {
                return {
                    label: anio.toString(),
                    data: dataTablaComunas.map(item => {
                        if (item.anio === anio) {
                            if (item.tipo === indicador) {
                                return item.total_emergencia_comuna_x;
                            }
                        }
                    }).filter(item => item !== undefined),
                    backgroundColor: ComunasOptions.map(comuna => getColorByComuna(comuna.value)),
                    borderWidth: 2,
                }

            }).filter(item => item !== null)

        }

        setDoughnut(doughnutData)
        setDistribucionChartOptions({
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            cutout: '20%'
        });
    }, [layoutConfig, indicador, anio,])

    const handleChange = (value, tipo) => {
        const updatedCookies = []
        if (tipo === 'i') {
            setIndicador(value)
            updatedCookies.push({ indicador: value, anio: [[...anio]], comuna: comuna })

        }
        if (tipo === 'c') {
            setComuna(value)
            updatedCookies.push({ indicador: indicador, anio: [[...anio]], comuna: value })
        }
        if (tipo === 'a') {
            setAnio(value.sort((a, b) => a - b))
           
            updatedCookies.push({ indicador: indicador, anio: [value], comuna: comuna })

        }
        debouncedReload()

        //tambien se deben guardar los indicadores en esta coockie
        saveCoockies('CompareChartComunas', JSON.stringify(updatedCookies))

    }
    const debouncedReload = useCallback(
        debounce(() => {

            Reload_data()
        }, 1000)
        , []
    )

    //obtener valor del indicador
    const indicadorValue = indicatorOptions.find(item => item.value === indicador)
    const DescripcionBodyTemplate = (rowData) => {
        const color = getColorByComuna(rowData.DESCRIPCION_COMUNA.replace(/\s/g, '_').toLowerCase())

        return <Tag value={rowData.DESCRIPCION_COMUNA} style={{ background: color }}></Tag>
    };
    const bodyNumberFormaterclientes_red = (rowData) => {
        //formatear el numero de clientes
        return new Intl.NumberFormat('es-CL').format(rowData.clientes_red)
    }
    const bodyNumberFormater = (rowData) => {
        //formatear el numero de clientes
        return new Intl.NumberFormat('es-CL').format(rowData.total_emergencia_comuna_x)
    }

    return (
        <>
            <ScrollTop />
            <Toast ref={toast}> </Toast>
            <div className="col-12 md:col-12">
                <div className="card-header line-height-4 d-flex justify-content-between" style={{ marginTop: '10px' }}>
                    <span>Comparacion anual de indicadores por comuna</span>
                    <div className="d-flex justify-content-end">
                        <Dropdown
                            options={indicatorOptions}
                            value={indicador}
                            optionLabel="label"
                            optionValue="value"
                            onChange={(e) => { handleChange(e.value, 'i') }}
                        />
                        <Dropdown
                            value={comuna}
                            onChange={(e) => { handleChange(e.value, 'c') }}
                            options={ComunasOptions}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecione años a comparar"
                            className="w-full md:w-20rem"
                        />
                        <MultiSelect
                            value={anio}
                            onChange={(e) => handleChange(e.value, 'a')}
                            options={yearOptions}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecione años a comparar"
                            className="w-full md:w-20rem"
                        />
                    </div>
                </div>
                <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
            <hr />
            <div className='grid' style={{ marginTop: '20px' }}>
                <div className="col-12 md:col-4">
                    <div className="font-medium line-height-4">Emergencias {indicadorValue.label} por comunas </div>
                    <div className="flex justify-content-center">
                        <Chart type="doughnut" id="Clientes_comunas_Chart" height='500px' data={doughnut} options={DistribucionChartOptions} style={{ position: 'relative', width: '75%' }}></Chart>
                    </div>

                </div>
                <div className="col-12 md:col-8">
                    <DataTable size='normal' removableSort stripedRows scrollable scrollHeight="500px" ref={dt} emptyMessage='No se encontraron resultados' selectionMode="single" value={dataTable} filterDisplay="row"
                        dataKey="id" paginator first={first} rows={rows} rowsPerPageOptions={[25, 50, 75, 100]} onPage={onPage} loading={loading}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} De un total De {totalRecords} datos" >
                        <Column field="DESCRIPCION_COMUNA" header="Comuna" body={DescripcionBodyTemplate} sortable></Column>
                        <Column field="anio" header="Año" sortable></Column>
                        <Column field="clientes_red" header="Clientes Red" align={'right'} body={bodyNumberFormaterclientes_red} sortable></Column>
                        <Column field="total_emergencia_comuna_x" align={'right'} body={bodyNumberFormater} header="Emergencias Comuna" sortable></Column>
                    </DataTable>

                </div>
            </div>



        </>
    );
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
    if (!anio[year]) {
        anio[year] = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    return anio[year] || '#000000'; // Si el tipo no está en el objeto, devuelve un color predeterminado
};



const getColorByComuna = (comuna) => {
    const comunas = {
        'talcahuano': '#f75e25',
        'san_pedro_de_la_paz': '#0f8bfd',
        'concepcion': '#873efe',
        'chiguayante': '#ff7c00',
        'hualpen': '#800040',
        'los_angeles': '#FAD116',

    };
    if (!comunas[comuna]) {
        comunas[comuna] = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }


    return comunas[comuna] || '#000000'; // Si el tipo no está en el objeto, devuelve un color predeterminado
};