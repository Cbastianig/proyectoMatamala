'use client';

import React, { useContext, useEffect } from 'react';
import { Button } from 'primereact/button';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import log_error from '@/app/lib/actions/Comunes/log/actions';



const Errorpage = ({ error, reset, layout }) => {

    const backgroundStyle = {
        boxSizing: 'border-box',
        background: layout ? '' : 'var(--exception-pages-image)', // Cambiar 'red' por el color que desees en caso de error
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    };
    useEffect(() => {
        log_error(error.message, error.stack);
    }, [error])
    const { layoutConfig, path } = useContext(LayoutContext);
    return (
        <>
            <div
                className={classNames('exception-body', 'min-h-screen', {
                    'layout-light': layoutConfig.colorScheme === 'light',
                    'layout-dark': layoutConfig.colorScheme === 'dark'
                })}
                style={layout ? {} : { background: 'var(--surface-ground)' }}>
                <div
                    className={classNames('exception-container', 'min-h-screen', 'flex', 'align-items-center', 'justify-content-center', 'flex-column', 'bg-auto', 'md:bg-contain', 'bg-no-repeat')}
                    style={backgroundStyle}
                >
                    <div className="exception-panel text-center flex align-items-center justify-content-center flex-column" style={{ marginTop: '-200px', boxSizing: 'border-box' }}>
                        <h1 className="text-red-400 mb-0" style={{ fontSize: '140px', fontWeight: 900, textShadow: '0px 0px 50px rgba(#fc6161, 0.2)' }}>
                            ERROR
                        </h1>
                        <h3 className="text-red-300" style={{ fontSize: '80px', fontWeight: 900, marginTop: '-90px', marginBottom: '50px' }}>
                            Algo salio mal
                        </h3>

                        <Button onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                            style={{ marginTop: '50px' }}>
                            Volver a intentar
                        </Button>
                    </div>
                    <div className="exception-footer absolute align-items-center flex" style={{ bottom: '60px' }}>
                        <img src={`${path}/layout/images/logo/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="exception-logo" style={{ width: '34px' }} alt="logo" />
                        <img src={`${path}/layout/images/logo/appname-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="exception-appname ml-3" style={{ width: '72px' }} alt="appname" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Errorpage;
