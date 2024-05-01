'use server'
require('dotenv').config();
export async function getPath() {
    const desa = process.env._ENV === 'DESA_GIS' ? true : false
    const localhost = process.env._ENV === 'LOCAL_DEV' ? true : false
    const prod = process.env._ENV === 'PRODUCCION' ? true : false
   
    let path = '';
    if (desa) path = '/gassur-dashboard'
    if (prod) path = '/gassur-dashboard'
  
    return path
}

export async function getEnv() {
    const desa = process.env._ENV === 'DESA_GIS' ? true : false
    const localhost = process.env._ENV === 'LOCAL_DEV' ? true : false
    const prod = process.env._ENV === 'PRODUCCION' ? true : false
    
    let path = 'LOCAL_DEV';
    if (desa) path = 'DESA_GIS'
    if (prod) path = 'PRODUCCION'

    return path
}