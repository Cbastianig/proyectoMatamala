
import { LayoutProvider } from '@/layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import './globals.css'
import { getCookie } from './services/getCookies';
import { getEnv, getPath } from './services/getPath';

import Acceso_denegado from './(main)/accessDenied';

export default async function RootLayout({ children }) {

    const env = await getEnv(); 

    const modo = (await getCookie('modo')) ?? 'light';
    const tema = (await getCookie('tema')) ?? 'blue';

    const path = await getPath();
    const headers = new Headers();
    const cookieValue = await getCookie('PHPSESSID');
    if (!cookieValue && env !== 'LOCAL_DEV') return (<html lang="es" suppressHydrationWarning>
        <head>
            <link id="theme-link" href={`${path}/theme/theme-${modo}/${tema}/theme.css`} rel="stylesheet"></link>
        </head>
        <body>
            <PrimeReactProvider>
                <LayoutProvider modo={modo} tema={tema} path={path}><Acceso_denegado layout={false}></Acceso_denegado></LayoutProvider>
            </PrimeReactProvider>
        </body>
    </html>)
    headers.append('Cookie', cookieValue);
    let requestDomain = 'https://desa-gis.gassur.cl';
    if(env === 'DESA_GIS') requestDomain = 'https://desa-gis.gassur.cl'; 
    if(env === 'PRODUCCION') requestDomain = 'https://gis.gassur.cl';
    if(env!=="LOCAL_DEV"){
    //ENVIAR LA COOCKIE COMO POST
    const phpsession = await fetch(`${requestDomain}/app/Get_SessionInfo.php`, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ cookie: cookieValue })
    }).then(res => res.json()).catch(err => console.log(err));

  
        if (phpsession.respuesta.status !== 'ok') return (
            <html lang="es" suppressHydrationWarning>
                <head>
                    <link id="theme-link" href={`${path}/theme/theme-${modo}/${tema}/theme.css`} rel="stylesheet"></link>
                </head>
                <body>
                    <PrimeReactProvider>
                        <LayoutProvider modo={modo} tema={tema} path={path}><Acceso_denegado layout={false}></Acceso_denegado></LayoutProvider>
                    </PrimeReactProvider>
                </body>
            </html>
        )
    }
  

    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link id="theme-link" href={`${path}/theme/theme-${modo}/${tema}/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider modo={modo} tema={tema} path={path}>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
