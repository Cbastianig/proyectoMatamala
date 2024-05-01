'use client';

import { usePathname } from 'next/navigation';
import { ObjectUtils, classNames } from 'primereact/utils';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Link from 'next/link'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AppBreadcrumb = () => {
    const rutas_no_Accesibles = ['inspeccion_movil', 'inspeccion_movil', 'medicion_potenciales']
    const [searchActive, setSearchActive] = useState(false);
    const pathname = usePathname();
    const [breadcrumb, setBreadcrumb] = useState(null);
    const { breadcrumbs, showSidebar } = useContext(LayoutContext);
    const searchInput = useRef(null);
    const basePath = '';
    const pathNames = pathname.split('/').filter(path => path);

    useEffect(() => {


        let items = pathNames.map((pathName, index) => {
            if (pathName === 'dashboard') {
                return null;
            } else {
                const formattedPathName = pathName.charAt(0).toUpperCase() + pathName.slice(1).replace(/[_-]/g, ' ');
                let path = `#`;
                // Construir el path acumulativo
                if (rutas_no_Accesibles.includes(pathName)) {
                    path = `#`;
                } else {
                    path = `${basePath}/${pathNames.slice(0, index + 1).join('/')}`;
                }


                return { label: formattedPathName, path: path };
            }
        }).filter(item => item !== null);


        setBreadcrumb(items);
    }, [pathname, breadcrumbs]);

    const activateSearch = () => {
        setSearchActive(true);
        setTimeout(() => {
            searchInput.current.focus();
        }, 100);
    };

    const deactivateSearch = () => {
        setSearchActive(false);
    };

    const onSidebarButtonClick = () => {
        showSidebar();
    };




    return (
        <div className="layout-breadcrumb flex align-items-center relative h-3rem">
            <nav className="layout-breadcrumb">
                <ol>
                    {ObjectUtils.isNotEmpty(breadcrumb) && pathname !== '/' ? (

                        breadcrumb.map((label, index) => {
                            return (
                                <React.Fragment key={label.label}>
                                    
                                    <Link href={label.path} className={index === breadcrumb.length - 1 ? 'active' : ''}>{label.label}</Link>
                                    {index !== breadcrumb.length - 1 && <li className="layout-breadcrumb-chevron"> / </li>}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <Link href={'/'}>Dashboard</Link >
                    )}
                </ol>
            </nav>
           
        </div>
    );
};

export default AppBreadcrumb;
