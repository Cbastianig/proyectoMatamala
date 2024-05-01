'use client'
import Loader from '@/ui/componenetes/loading';

import React, { useEffect, useState } from 'react';
import FullPage from '../(full-page)/pages/fullPage/page';



export default function FullPageLayout({ children }) {

    const [client, SetClient] = useState(false);
    useEffect(() => {
        SetClient(true);

    })
    if (!client) {
        return (<Loader></Loader>)
    }

    return (

        <FullPage>
            {children}
        </FullPage>


    );
}
