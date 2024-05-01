"use server";
require("dotenv").config();
import log_error from "../actions/Comunes/log/actions";
import { connect } from "../connect";

export async function getDataChart(fecha_inicio, fecha_fin, diametro, tipo) {
  let query = "";
  const conn = await connect();
  try {
    const fecha_inicio_query = convertirFechaMySQL(fecha_inicio);
    const fecha_fin_query = convertirFechaMySQL(fecha_fin);
    let values = [fecha_inicio_query, fecha_fin_query];

    query = `SELECT UPPER(comuna) AS comuna, YEAR(fecha_foto) AS anio, SUM(ROUND(longitud)) AS total_red
        FROM gassur_geo.toda_red_historico
        WHERE fecha_foto BETWEEN ? AND ? AND comuna != 'Coronel' AND YEAR(fecha_foto) != 2022`;

    if (diametro == "todos" || diametro == "") {
    } else {
      query += " AND diametro IN (?)";
      values.push(diametro.split(","));
    }
    if (tipo == "todos" || tipo == "") {
    } else {
      query += " AND tipo IN (?)";
      values.push(tipo.toUpperCase().split(","));
    }

    query +=
      " GROUP BY comuna, anio ORDER BY comuna DESC, anio ASC, total_red DESC;";

    const [results, fields] = await conn.query(query, values);
    return results;
  } catch (err) {
    console.log(err);
    log_error(err);
    throw new Error(err);
  }
}

export async function getAniosChart(fecha_inicio, fecha_fin, diametro, tipo) {
  let query = "";
  const conn = await connect();
  try {
    const fecha_inicio_query = convertirFechaMySQL(fecha_inicio);
    const fecha_fin_query = convertirFechaMySQL(fecha_fin);
    let values = [fecha_inicio_query, fecha_fin_query];

    query = `SELECT DISTINCT DATE_FORMAT(fecha_foto, '%Y') as anio_actual
            FROM gassur_geo.toda_red_historico WHERE fecha_foto BETWEEN ? AND ? AND comuna != 'Coronel' AND YEAR(fecha_foto) != 2022`;

    if (diametro == "todos" || diametro == "") {
    } else {
      query += " AND diametro IN (?)";
      values.push(diametro.split(","));
    }
    if (tipo == "todos" || tipo == "") {
    } else {
      query += " AND tipo IN (?)";
      values.push(tipo.toUpperCase().split(","));
    }

    query += " ORDER BY fecha_foto ASC;";

    const [results, fields] = await conn.query(query, values);
    return results;
  } catch (err) {
    console.log(err);
    log_error(err);
    throw new Error(err);
  }
}

export async function getDataPie(fecha_inicio, fecha_fin, diametro, tipo) {
  let query = "";
  const conn = await connect();
  try {
    const fecha_inicio_query = convertirFechaMySQL(fecha_inicio);
    const fecha_fin_query = convertirFechaMySQL(fecha_fin);
    let values = [fecha_inicio_query, fecha_fin_query];

    query = `SELECT UPPER(comuna) AS comuna, SUM(ROUND(longitud)) AS total_red
            FROM gassur_geo.toda_red_historico
            WHERE fecha_foto BETWEEN ? AND ? AND comuna != 'Coronel'`;

    if (diametro == "todos" || diametro == "") {
    } else {
      query += " AND diametro IN (?)";
      values.push(diametro.split(","));
    }
    if (tipo == "todos" || tipo == "") {
    } else {
      query += " AND tipo IN (?)";
      values.push(tipo.toUpperCase().split(","));
    }

    query += " GROUP BY comuna ORDER BY 2 DESC;";

    const [results, fields] = await conn.query(query, values);
    return results;
  } catch (err) {
    console.log(err);
    log_error(err);
    throw new Error(err);
  }
}

export async function getDataTabla(fecha_inicio, fecha_fin, diametro, tipo) {
  let query = "";
  let values = [];
  const conn = await connect();
  try {
    const fecha_inicio_query = convertirFechaMySQL(fecha_inicio);
    const fecha_fin_query = convertirFechaMySQL(fecha_fin);
    let values = [fecha_inicio_query, fecha_fin_query];

    query = `SELECT UPPER(comuna) AS comuna,
            REPLACE(FORMAT(SUM(CASE WHEN tipo = 'TERCIARIA' THEN ROUND(longitud) ELSE 0 END), '#,###'), ',', '.') AS total_terciaria,
            REPLACE(FORMAT(SUM(CASE WHEN tipo = 'SECUNDARIA' THEN ROUND(longitud) ELSE 0 END), '#,###'), ',', '.') AS total_secundaria,
            REPLACE(FORMAT(SUM(CASE WHEN tipo = 'PRIMARIA' THEN ROUND(longitud) ELSE 0 END), '#,###'), ',', '.') AS total_primaria,
		        SUM(ROUND(longitud)) AS total_general
            FROM gassur_geo.toda_red_historico
            WHERE fecha_foto BETWEEN ? AND ? AND comuna != 'Coronel'`;

    if (diametro == "todos" || diametro == "") {
    } else {
      query += " AND diametro IN (?)";
      values.push(diametro.split(","));
    }
    if (tipo == "todos" || tipo == "") {
    } else {
      query += " AND tipo IN (?)";
      values.push(tipo.toUpperCase().split(","));
    }

    query += " GROUP BY comuna ORDER BY total_general DESC;";

    const [results, fields] = await conn.query(query, values);
    return results;
  } catch (err) {
    console.log(err);
    log_error(err);
    throw new Error(err);
  }
}

export async function getDiametros() {
  let query = "";
  let values = [];
  const conn = await connect();
  try {
    query = `SELECT DISTINCT diametro FROM gassur_geo.toda_red_historico ORDER BY diametro DESC;`;
    const [results, fields] = await conn.query(query, values);
    return results;
  } catch (err) {
    console.log(err);
    log_error(err);
    throw new Error(err);
  }
}

function convertirFechaMySQL(fechaOriginal) {
  // Convertir la fecha a un objeto Date
  var fecha = new Date(fechaOriginal);

  // Obtener los componentes de la fecha
  var año = fecha.getFullYear();
  var mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
  var dia = fecha.getDate();

  // Formatear la fecha para MySQL
  var fechaMySQL =
    año + "-" + (mes < 10 ? "0" : "") + mes + "-" + (dia < 10 ? "0" : "") + dia;

  return fechaMySQL;
}
