import { useEffect, useState } from "react";

export default function useGraficoLocalidad({
  multiselectValueComuna,
  layoutConfig,
  data_anios,
  data,
  data_tabla,
  data_pie,
}) {
  const [avanceChartPieOptions, setAvanceChartPieOptions] = useState(null);

  const [chartData, setChartData] = useState({});
  const [chartDataPie, setChartDataPie] = useState({});
  const [carouselRedes, setCustomerCarousel] = useState({});

  const [dataTabla, setDataTabla] = useState([]);
  const [avanceChartOptions, setAvanceChartOptions] = useState(null);

  let datanew = [];
  let labels = [];
  //cada comuna es un dataset y va ordenado por anio
  const datachart = data_anios.map((anio) => {
    let datacomuna = [];
    multiselectValueComuna.forEach((comuna) => {
      if (data[comuna] && data[comuna][anio]) {
        datacomuna.push(data[comuna][anio].datos);
      }
    });
    datanew.push({
      label: anio,
      data: datacomuna,
    });
  });
  labels = multiselectValueComuna;

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#ffffff";

    const carouselData = [];

    const chartData = {
      labels: labels,
      datasets: data_anios.map((anio) => {
        let datacomuna = [];
        multiselectValueComuna.forEach((comuna) => {
          if (data[comuna] && data[comuna][anio]) {
            datacomuna.push(data[comuna][anio].datos);
          }
        });

        return {
          label: anio,
          data: datacomuna,
          borderWidth: 1,
        };
      }),
    };
    const chartDataPie = {
      labels: [],
      datasets: [],
    };
    const dataTabla = [];

    let pieData = [];
    let pieLabels = [];
    let pieColors = [];
    let totalMetros = 0;

    carouselData.push({
      comuna: "TOTAL METROS",
      total: 0,
    });

    multiselectValueComuna.forEach((comuna) => {
      if (data && data[comuna]) {
        carouselData.push({
          comuna: data_pie[comuna].nombre,
          total: data_pie[comuna].datos_pie.toLocaleString("es-CL"),
        });

        totalMetros += data_pie[comuna].datos_pie.reduce((a, b) => a + b, 0);

        pieData = pieData.concat(data_pie[comuna].datos_pie);
        pieLabels = pieLabels.concat(data_pie[comuna].nombre);
        pieColors = pieColors.concat(data_pie[comuna].color);

        dataTabla.push({
          comuna: data_tabla[comuna].nombre,
          color: data_tabla[comuna].color,
          total_terciaria: data_tabla[comuna].total_terciaria,
          total_secundaria: data_tabla[comuna].total_secundaria,
          total_primaria: data_tabla[comuna].total_primaria,
        });
      }
    });

    carouselData[0].total = totalMetros.toLocaleString("es-CL");

    chartDataPie.labels = pieLabels;
    chartDataPie.datasets.push({
      data: pieData,
      backgroundColor: pieColors,
      hoverBackgroundColor: pieColors,
      type: "pie",
    });
    setChartData(chartData);
    setChartDataPie(chartDataPie);
    setDataTabla(dataTabla);
    setCustomerCarousel(carouselData);

    setAvanceChartOptions({
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: textColor,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        mode: "index",
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      },

      scales: {
        y: {
          ticks: {
            color: textColor,
          },
          grid: {
            display: false,
          },
        },
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            display: false,
          },
        },
      },
    });

    setAvanceChartPieOptions({
      plugins: {
        legend: {
          position: "right",
          labels: {
            usePointStyle: true,
            color: textColor,
            padding: 15,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    });
  }, [layoutConfig, multiselectValueComuna]);

  return {
    avanceChartPieOptions,
    chartData,
    chartDataPie,
    carouselRedes,
    dataTabla,
    avanceChartOptions,
  };
}