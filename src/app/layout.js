
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

  

    const modo = (await getCookie('modo')) ?? 'light';
    const tema = (await getCookie('tema')) ?? 'blue';

    const path = await getPath();
 

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
