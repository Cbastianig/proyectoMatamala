'use client';

import React, { Children, useContext } from 'react';
import { classNames } from 'primereact/utils';
import { LayoutContext } from '../../../../layout/context/layoutcontext';


function FullPage({ layout, children }) {

    const { layoutConfig, path } = useContext(LayoutContext);

    const backgroundStyle = {
        boxSizing: 'border-box',
        background: layout ? '' : 'var(--exception-pages-image)', // Cambiar 'red' por el color que desees en caso de error
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    };


    return (
        <>
            <div className={classNames('exception-body', 'min-h-screen', layoutConfig.colorScheme === 'light' ? 'layout-light' : 'layout-dark')} style={layout ? {} : { background: 'var(--surface-ground)' }}>
                <div
                    className="layout-content-wrapper  min-h-screen flex  justify-content-center flex-column bg-auto md:bg-contain bg-no-repeat"
                    style={backgroundStyle}>
                    {children}


                </div>
            </div>
        </>
    );
}

export default FullPage;
