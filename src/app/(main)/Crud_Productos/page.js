import SkeletonChart from "@/ui/skeleton/chart";

import { cookies } from 'next/headers'
import { createData, readDataProductos } from "@/app/lib/dashboard/actions";
import TablaCrud from "./componenetes/tablaCrud";




export const metadata = {
    title: 'Dashboard - Matamala',
}




export default async function Page({ searchParams }) {

    const data = await readDataProductos()
    
    
 
   
    return (<>
        <TablaCrud data={data} />

    </>

    );
}

