'use client'
import Layout from "@/layout/layout";
import Loader from "@/ui/componenetes/loading";

import { useEffect, useState } from "react";

export default function MainLayout({ children }) {

    const [client, SetClient] = useState(false);
    useEffect(() => {
        SetClient(true);
    }, []);

    if (!client) {
        return (<Loader></Loader>)
    }
    return (

        <Layout>
            {children}
        </Layout>

    )
}
