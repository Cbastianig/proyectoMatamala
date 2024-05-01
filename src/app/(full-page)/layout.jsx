'use client'
import Loader from '@/ui/componenetes/loading';
import AppConfig from '../../layout/AppConfig';
import React, { useEffect, useState } from 'react';



export default function FullPageLayout({ children }) {
    
    const [client, SetClient] = useState(false);
    useEffect(() => {
        SetClient(true);
    })
    if (!client) {
        return (<Loader></Loader>)
    }

    return (
        <React.Fragment>
            {children}
            <AppConfig minimal />
        </React.Fragment>
    );
}
