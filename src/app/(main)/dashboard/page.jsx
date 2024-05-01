import SkeletonChart from "@/ui/skeleton/chart";
import { Suspense } from "react";
import { cookies } from 'next/headers'



export const metadata = {
    title: 'Dashboard - Matamala',
}




export default async function Page({ searchParams }) {

    const cookieStore = cookies()




    return (<>
       hola
    </>

    );
}

