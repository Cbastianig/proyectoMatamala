"use client";
import { useContext, useState } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { Chart } from "primereact/chart";
import InputFilterDate from "@/componentes/InputFilterDate";
import { MultiSelect } from "primereact/multiselect";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Carousel } from "primereact/carousel";
import useTemplates from "../hooks/useTemplates";
import useGraficoLocalidad from "../hooks/useGraficoLocalidad";
import useFiltrosCabecera from "../hooks/useFiltrosCabecera";
import { Tag } from "primereact/tag";

export default function GraficoPrincipal({
  data,
  data_pie,
  data_anios,
  data_tabla,
  groupOptions,
  groupOptionsDiametro,
  fecha_inicio,
  fecha_fin,
  diametro,
  tipo,
}) {
  const diametroArray = diametro === "todos" ? null : diametro.split(",");
  const tipoArray = tipo === "todos" ? null : tipo.split(",");
  const [multiselectValueComuna, setMultiselectValueComuna] = useState(
    groupOptions.map((option) => option.value)
  );

  const { layoutConfig } = useContext(LayoutContext);
  const {
    avanceChartPieOptions,
    chartData,
    chartDataPie,
    carouselRedes,
    dataTabla,
    avanceChartOptions,
  } = useGraficoLocalidad({
    multiselectValueComuna,
    layoutConfig,
    data_anios,
    data,
    data_tabla,
    data_pie,
  });
  const { handleclickBuscar2, setFechaFiltro, changeSistemaChart } =
    useFiltrosCabecera({});

  const { itemTemplate, itemTemplateRedes, getTipos, carouselResponsiveOptions, filter_inicio_fecha, } = useTemplates({ fecha_inicio, fecha_fin });
  const [multiselectValueDiametro, setMultiselectValueDiametro] = useState(
    diametroArray || groupOptionsDiametro.map((option) => option.value)
  );
  const [multiselectValueTipo, setMultiselectValueTipo] = useState(
    tipoArray || getTipos.map((option) => option.value)
  );
  const handleComunaChange = (selectedOptions) => {
    const originaldata = groupOptions.map((option) => option.value);
    selectedOptions.sort(
      (a, b) => originaldata.indexOf(a) - originaldata.indexOf(b)
    );
    setMultiselectValueComuna(selectedOptions);
  };

  const LocalidadBodyTemplate = (rowData) => {
    //elimina tildes de rowdata.comuna
    rowData.comuna = rowData.comuna.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const color = data[rowData.comuna][2024].color;
    return <Tag value={rowData.comuna} style={{ background: color }}></Tag>
};

  return (
    <>
      <div className="card-header line-height-4 d-flex justify-content-between">
        <div className="col-12 md:col-3">
          <h6>Diámetro</h6>
          <MultiSelect
            value={multiselectValueDiametro}
            options={groupOptionsDiametro}
            onChange={(e) => {
              setMultiselectValueDiametro(e.value);
              changeSistemaChart(e.value, "diametro");
            }}
            placeholder="Seleccionar diámetro"
            filter
            className="multiselect-custom"
            style={{ minWidth: "100%", maxWidth: "100%" }}
          />
        </div>
        <div className="col-12 md:col-3">
          <h6>Tipo</h6>
          <MultiSelect
            value={multiselectValueTipo}
            options={getTipos}
            onChange={(e) => {
              setMultiselectValueTipo(e.value);
              changeSistemaChart(e.value, "tipo");
            }}
            placeholder="Seleccionar tipo"
            itemTemplate={itemTemplate}
            optionLabel="name"
            className="multiselect-custom"
            display="chip"
            style={{ minWidth: "100%", maxWidth: "100%" }}
          />
        </div>
        <div className="col-12 md:col-3">
          <h6>Localidad</h6>
          <MultiSelect
            value={multiselectValueComuna}
            options={groupOptions}
            onChange={(e) => {
              handleComunaChange(e.value);
              changeSistemaChart(e.value);
            }}
            placeholder="Seleccionar localidad"
            className="multiselect-custom"
            style={{ minWidth: "100%", maxWidth: "100%" }}
          />
        </div>
        <div className="col-12 md:col-3">
          <h6>Seleccione un período</h6>
          <InputFilterDate
            filter_inicio_fecha={filter_inicio_fecha}
            nombre_range={"grafico_redes"}
            handleclickBuscar={handleclickBuscar2}
            setFecha={setFechaFiltro}
          ></InputFilterDate>
        </div>
      </div>
      <br></br>
      <div className="grid">
        <h4>Redes</h4>
        <div className="col-12 widget-customer-carousel">
          <Carousel
            value={carouselRedes}
            numVisible={5}
            numScroll={1}
            responsiveOptions={carouselResponsiveOptions}
            itemTemplate={itemTemplateRedes}
            circular
            showIndicators={false}
          />
        </div>
      </div>
      <br></br>
      <div className="graph card">
        <h4>Longitud de red por año</h4>
        <br></br>
        <Chart
          id="grafico_principal"
          height="600"
          type="bar"
          data={chartData}
          options={avanceChartOptions}
        ></Chart>
      </div>
      <br></br>
      <div className="grid p-fluid">
        <div className="col-12 xl:col-6">
          <div className="card">
            <h4>Longitud de red por localidad</h4>
            <Chart
              id="grafico_principal_pie"
              height="235"
              type="pie"
              data={chartDataPie}
              options={avanceChartPieOptions}
            ></Chart>
          </div>
        </div>
        <div className="col-12 xl:col-6">
          <div className="card">
            <h4>Tipo / Longitud</h4>
            <DataTable value={dataTabla}>
              <Column sortable field="comuna" body={LocalidadBodyTemplate} header="Localidad"></Column>
              <Column
                sortable
                align={'right'}
                field="total_terciaria"
                header="Terciaria"
              ></Column>
              <Column
                sortable
                align={'right'}
                field="total_secundaria"
                header="Secundaria"
              ></Column>
              <Column
                sortable
                align={'right'}
                field="total_primaria"
                header="Primaria"
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}