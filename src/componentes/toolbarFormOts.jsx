"use client"
import React from 'react';
//import { useRouter } from 'next/router';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';


export default function ToolbarFormOts({ children }) {


    const startContent = (
        <React.Fragment>
            {children}

        </React.Fragment>
    );
    return (
        <div className="card">
            <Toolbar start={startContent} />
        </div>
    );
}
