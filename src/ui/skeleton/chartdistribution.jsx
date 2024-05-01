'use client'
import { Skeleton } from 'primereact/skeleton';
import { useState, useEffect } from 'react';

function SkeletonDistributionChart() {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const calculateElementWidth = () => {
        if (windowWidth < 768) {
            return `${(windowWidth - 40) / 6}px`; // Ajuste para dispositivos móviles
        } else {
            return `${(windowWidth - 60) / 16}px`; // Ajuste para otros dispositivos
        }
    };


    return (
        <>
            <div className="border-round border-1 surface-border p-4 surface-card">
                <div className="flex mb-3 justify-content-center">

                    <div className="flex justify-content-center mt-3">
                        <Skeleton width="5rem" className="mb-2 mx-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2 mx-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2 mx-2"></Skeleton>

                    </div>



                </div>
                <div className="w-full flex p-3 justify-content-center ">

                    <Skeleton width="20rem" height="15rem" borderRadius="16px"></Skeleton>
                </div>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2"></Skeleton>


            </div>

        </>




    );
}

export default SkeletonDistributionChart;
