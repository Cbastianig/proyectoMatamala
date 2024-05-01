'use server'
require('dotenv').config();
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import log_error from "../actions/Comunes/log/actions";
import { createSSHConnection, connect } from "../connect";
import { getindicadores } from '@/app/(main)/dashboard/componentes/graficoServerindicarores';


export async function getDataOficioSec(fecha_inicio, fecha_fin) {
   
    let query = ''
    let values = []
    let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }

    try {

        const fecha_inicio_query = convertirFechaMySQL(fecha_inicio)
        const fecha_fin_query = convertirFechaMySQL(fecha_fin)

        query = `SELECT tipo, DATE_FORMAT(mes_actual, '%m-%Y') as mes_actual, indicador 
            FROM gassur_star.MV_INDICADORES_GENERALES_31350 
            WHERE mes_actual BETWEEN ? AND ? ;`
        values = [fecha_inicio_query, fecha_fin_query]


        const [results, fields] = await conn.query(query, values);

        return results;
    } catch (err) {


        console.log(err)
        log_error(err)
        throw new Error(err)

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
    var fechaMySQL = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;

    return fechaMySQL;
}

export async function getmesesOficioSec(fecha_inicio, fecha_fin) {
    let query = ''
    let values = []
    let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
    try {
        const fecha_inicio_query = convertirFechaMySQL(fecha_inicio)
        const fecha_fin_query = convertirFechaMySQL(fecha_fin)
        query = `SELECT DISTINCT DATE_FORMAT(mes_actual, '%m-%Y') as mes_actual
            FROM gassur_star.MV_INDICADORES_GENERALES_31350
            WHERE mes_actual BETWEEN ? AND ?`
        values = [fecha_inicio_query, fecha_fin_query]

        const [results, fields] = await conn.query(query, values);



        return results;
    } catch (err) {
        log_error(err)
        console.log(err);
        throw new Error(err)

    }
}


export async function GetDataAnios() {
    try {
        let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
        const [results, fields] = await conn.query(`SELECT 
        tipo, 
        DATE_FORMAT(mes_actual, '%m-%Y') AS mes_actual, 
        DATE_FORMAT(mes_actual, '%Y') AS anio, 
        indicador 
      FROM 
        gassur_star.MV_INDICADORES_GENERALES_31350 
      GROUP BY 
        YEAR(mes_actual), 
        MONTH(mes_actual), 
        tipo 
      ORDER by 
        mes_actual;
      `);

        const groupedData = {};

        // Agrupar los datos por tipo
        results.forEach(item => {
            const tipo = item.tipo;
            const anio = item.anio
            if (!groupedData[tipo]) {
                groupedData[tipo] = {};
            }
            if (!groupedData[tipo][anio]) {
                groupedData[tipo][anio] = [];
            }
            const obj = { mes_actual: item.mes_actual, indicador: item.indicador, anio: anio };
            groupedData[item.tipo][item.anio].push(obj);
        });



        return await transformData(groupedData);


    } catch (err) {
        log_error(err)
        console.log(err);
        throw new Error(err)

    }


}

export async function GetDataComunasAnios() {
    try {
        let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
        const [results, fields] = await conn.query(`SELECT 
        DATE_FORMAT(comunales.mes_actual, '%m-%Y') AS mes_actual, 
        DATE_FORMAT(comunales.mes_actual, '%Y') AS anio, 
        comunales.emergencias_x as total_emergencia_comuna, 
        comunales.emergencias_y as total_emergencia_comunay, 
        comunales.comuna as DESCRIPCION_COMUNA, 
        comunales.clientes_red as clientes_red, 
        generales.indicador as indicador_general, 
        comunales.indicador as indicador_por_comuna ,
        comunales.tipo 
      FROM 
        gassur_star.MV_INDICADORES_COMUNALES_31350 comunales 
        INNER JOIN gassur_star.MV_INDICADORES_GENERALES_31350 generales on generales.tipo = comunales.tipo 
        and generales.mes_actual = comunales.mes_actual 
      GROUP BY 
      DESCRIPCION_COMUNA,
      anio, 
      mes_actual,
        tipo order by mes_actual
      `);

        const groupedData = {};

        // Agrupar los datos por tipo
        results.forEach(item => {
            const tipo = item.tipo;
            const anio = item.anio;
            const comuna = item.DESCRIPCION_COMUNA.replace(/\s/g, '_').toLowerCase();
            if (!groupedData[tipo]) {
                groupedData[tipo] = {};
            }
            if (!groupedData[tipo][comuna]) {
                groupedData[tipo][comuna] = {};
            }
            if (!groupedData[tipo][comuna][anio]) {
                groupedData[tipo][comuna][anio] = [];
            }

            const obj = { mes_actual: item.mes_actual, indicador: item.tipo, anio: anio, comuna: item.DESCRIPCION_COMUNA, total_emergencia_comuna: item.total_emergencia_comuna, total_emergencia_comunay: item.total_emergencia_comunay, clientes_red: item.clientes_red, indicador_general: item.indicador_general, indicador_por_comuna: item.indicador_por_comuna };
            groupedData[tipo][comuna][anio].push(obj);
        });



        return await transformDataComunas(groupedData);


    } catch (err) {
        log_error(err)
        console.log(err);
        throw new Error(err)

    }


}
export async function GetAniosDatagrafico() {
    let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
    try {
        const [results, fields] = await conn.query(`SELECT DISTINCT DATE_FORMAT(mes_actual, '%Y') as anios
        FROM gassur_star.MV_INDICADORES_GENERALES_31350;
      `);

        return results;

    } catch (err) {
        log_error(err)
        console.log(err);
        throw new Error(err)

    }


}


export async function GetDataComunas() {
    let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
    try {
        const [results, fields] = await conn.query(`SELECT comunales.comuna as DESCRIPCION_COMUNA FROM 
        gassur_star.MV_INDICADORES_COMUNALES_31350 comunales 
        GROUP BY DESCRIPCION_COMUNA;`);

        return results;

    } catch (error) {
        log_error(error)
        console.log(error);
        throw new Error(error)
    }
}


const transformData = async (data) => {
    const dataInfo = await getindicadores();
    const transformedData = {};

    for (const type in data) {

        transformedData[type] = {};

        for (const year in data[type]) {
            const indicadorData = Array.from({ length: 12 }, (_, i) => {
                const monthData = data[type][year].find(item => parseInt(item.mes_actual.split('-')[0]) === i + 1);
                return monthData ? monthData.indicador : 0;
            });



            transformedData[type][year] = {
                data: indicadorData,
                grupo: dataInfo[type].grupo,
                nombre: dataInfo[type].nombre,
                tipo: dataInfo[type].tipo,
                anio: year,



            };
        }
    }


    return transformedData;


};



const transformDataComunas = async (data) => {
    try {
        const dataInfo = await getindicadores();
        const transformedData = {};

        for (const type in data) {

            transformedData[type] = {};
            for (const comuna in data[type]) {
                transformedData[type][comuna] = {};

                for (const year in data[type][comuna]) {
                    const indicadorData = Array.from({ length: 12 }, (_, i) => {
                        const monthData = data[type][comuna][year].find(item => parseInt(item.mes_actual.split('-')[0]) === i + 1);
                        return monthData ? monthData.total_emergencia_comuna : 0;
                    });
                    transformedData[type][comuna][year] = {
                        data: indicadorData,
                        grupo: dataInfo[type].grupo,
                        nombre: dataInfo[type].nombre,
                        tipo: dataInfo[type].tipo,
                        anio: year,
                        clientes_red: data[type][comuna][year][0].clientes_red,
                        total_emergencia_comuna: data[type][comuna][year][0].total_emergencia_comuna,

                    };


                }
            }


        }
        return transformedData;
    } catch (error) {
        console.log(error)
    }



};

export async function GetDataAniocomuna() {
    let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
    try {
        const [results, fields] = await conn.query(`SELECT 
        ROW_NUMBER() OVER (ORDER BY anio, DESCRIPCION_COMUNA) AS id,
        YEAR(comunales.mes_actual) AS anio, 
        SUM(comunales.emergencias_x) AS total_emergencia_comuna_x, 
        MAX(comunales.emergencias_y) AS total_emergencia_comuna_y, 
        comunales.comuna AS DESCRIPCION_COMUNA, 
        comunales.clientes_red AS clientes_red,
        comunales.indicador AS indicador_por_comuna,
        comunales.tipo 
    FROM 
        gassur_star.MV_INDICADORES_COMUNALES_31350 comunales 
    INNER JOIN 
        gassur_star.MV_INDICADORES_GENERALES_31350 generales 
        ON generales.tipo = comunales.tipo 
        AND generales.mes_actual = comunales.mes_actual 
    GROUP BY 
        YEAR(comunales.mes_actual), comunales.comuna, comunales.tipo
    ORDER BY 
        anio, DESCRIPCION_COMUNA;
      `);
        let result = results.map(result => {
            return Object.assign({}, result);
        });

        return result;
    } catch (error) {
        console.error(error);
    }

}


export async function GetDataTablaComunas(anios, indicador) {
    try {
        let conn = null
    if (process.env.NODE_ENV === 'LOCAL_DEV') {
         conn = await createSSHConnection();
    }
    else {
         conn = await connect();
    }
        const [results, fields] = await conn.query(`SELECT 
        ROW_NUMBER() OVER (ORDER BY anio, DESCRIPCION_COMUNA) AS id,
        YEAR(comunales.mes_actual) AS anio, 
        SUM(comunales.emergencias_x) AS total_emergencia_comuna_x, 
        MAX(comunales.emergencias_y) AS total_emergencia_comuna_y, 
        comunales.comuna AS DESCRIPCION_COMUNA, 
        comunales.clientes_red AS clientes_red,
        comunales.indicador AS indicador_por_comuna,
        comunales.tipo 
    FROM 
        gassur_star.MV_INDICADORES_COMUNALES_31350 comunales 
    INNER JOIN 
        gassur_star.MV_INDICADORES_GENERALES_31350 generales 
        ON generales.tipo = comunales.tipo 
        AND generales.mes_actual = comunales.mes_actual 
    WHERE 
         YEAR(comunales.mes_actual) IN (?) and comunales.tipo = ?
    GROUP BY 
        YEAR(comunales.mes_actual), comunales.comuna, comunales.tipo
    ORDER BY 
        anio, DESCRIPCION_COMUNA; `, [anios, indicador]);
        let result = results.map(result => {
            return Object.assign({}, result);
        });
        return result;
    } catch (error) {
        console.error(error);
        throw new Error(error)

    }

}



