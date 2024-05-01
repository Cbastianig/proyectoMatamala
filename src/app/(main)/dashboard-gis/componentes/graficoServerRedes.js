import {
  getDataChart,
  getAniosChart,
  getDiametros,
  getDataPie,
  getDataTabla,
} from "@/app/lib/dashboard-gis/actions";
import GraficoPrincipal from "./graficoPrincipalRedes";

export default async function GraficoServerRedes({
  fecha_inicio,
  fecha_fin,
  diametro,
  tipo,
}) {
  
  const [data, data_anios, diametros, data_pie, data_tabla] = await Promise.all(
    [
      getDataChart(fecha_inicio, fecha_fin, diametro, tipo),
      getAniosChart(fecha_inicio, fecha_fin, diametro, tipo),
      getDiametros(),
      getDataPie(fecha_inicio, fecha_fin, diametro, tipo),
      getDataTabla(fecha_inicio, fecha_fin, diametro, tipo),
    ]
  );

  let anios = [];
  data_anios.forEach((element) => {
    anios.push(element.anio_actual);
  });

  const comunas = getComunas();

  const newData = {};
  data.sort((a, b) => a.anio - b.anio).forEach((item) => {
    if (!newData[item.comuna]) {
      newData[item.comuna] = {};
    }
    if (!newData[item.comuna][item.anio]) {
      const comunaData = getComunas()[item.comuna];
      newData[item.comuna][item.anio] = {
        nombre: comunaData.nombre,
        valor: comunaData.valor,
        color: comunaData.color,
        anio: item.anio,
        datos: item.total_red,
      };
    }
  });

  const newDataPie = {};
  data_pie.forEach((item) => {
    if (!newDataPie[item.comuna]) {
      const comunaDataPie = getComunas()[item.comuna];
      newDataPie[item.comuna] = {
        nombre: comunaDataPie.nombre,
        valor: comunaDataPie.valor,
        color: comunaDataPie.color,
        datos_pie: [],
      };
    }

    newDataPie[item.comuna].datos_pie.push(item.total_red);
  });

  const newDataTabla = {};
  data_tabla.forEach((item) => {
    if (!newDataTabla[item.comuna]) {
      const comunaDataPie = getComunas()[item.comuna];
      newDataTabla[item.comuna] = {
        nombre: comunaDataPie.nombre,
        valor: comunaDataPie.valor,
        color: comunaDataPie.color,
        total_terciaria: 0,
        total_secundaria: 0,
        total_primaria: 0,
      };
    }

    newDataTabla[item.comuna].total_terciaria = item.total_terciaria;
    newDataTabla[item.comuna].total_secundaria = item.total_secundaria;
    newDataTabla[item.comuna].total_primaria = item.total_primaria;
  });

  const groupCountsComuna = {};
  const groupOptionsComuna = Object.values(comunas).reduce(
    (accumulator, current) => {
      if (!groupCountsComuna[current.nombre]) {
        groupCountsComuna[current.nombre] = 1;
        accumulator.push({ label: current.nombre, value: current.valor });
      } else {
        groupCountsComuna[current.nombre]++;
      }
      return accumulator;
    },
    []
  );

  const array_diametro = getDiametrosArray(diametros);
  const groupCountsDiametro = {};
  const groupOptionsDiametro = Object.values(array_diametro).reduce(
    (accumulator, current) => {
      if (!groupCountsDiametro[current.tipo]) {
        groupCountsDiametro[current.tipo] = 1;
        accumulator.push({ label: current.tipo, value: current.tipo });
      } else {
        groupCountsDiametro[current.tipo]++;
      }
      return accumulator;
    },
    []
  );

  return (
    <>
      <GraficoPrincipal
        fecha_inicio={fecha_inicio}
        fecha_fin={fecha_fin}
        diametro={diametro}
        tipo={tipo}
        data={newData}
        data_anios={anios}
        groupOptions={groupOptionsComuna}
        groupOptionsDiametro={groupOptionsDiametro}
        data_pie={newDataPie}
        data_tabla={newDataTabla}
      ></GraficoPrincipal>
    </>
  );
}

function getComunas() {
  return {
    CONCEPCION: {
      nombre: "CONCEPCIÓN",
      valor: "CONCEPCION",
      color: "#4285F4",
    },
    "SAN PEDRO DE LA PAZ": {
      nombre: "SAN PEDRO DE LA PAZ",
      valor: "SAN PEDRO DE LA PAZ",
      color: "#DB4437",
    },
    TALCAHUANO: {
      nombre: "TALCAHUANO",
      valor: "TALCAHUANO",
      color: "#F4B400",
    },
    CHIGUAYANTE: {
      nombre: "CHIGUAYANTE",
      valor: "CHIGUAYANTE",
      color: "#0F9D58",
    },
    "LOS ANGELES": {
      nombre: "LOS ÁNGELES",
      valor: "LOS ANGELES",
      color: "#00ACC1",
    },
    HUALPEN: {
      nombre: "HUALPÉN",
      valor: "HUALPEN",
      color: "#00796B",
    },
  };
}

function getDiametrosArray(diametros) {
  const arrayDiametros = [];
  for (const diametro of diametros) {
    arrayDiametros.push({ tipo: diametro.diametro, code: "US" });
  }
  return arrayDiametros;
}