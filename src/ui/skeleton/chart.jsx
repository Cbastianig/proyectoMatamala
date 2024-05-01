'use client'
import { Skeleton } from 'primereact/skeleton';
import { useState, useEffect } from 'react';

function SkeletonChart({ altura }) {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const alturamax = altura || 400;
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
        <div className="flex flex-wrap">
            <div className="flex align-items-end" style={{ maxWidth: '100%' }}>
                {[...Array(windowWidth < 768 ? 6 : 12)].map((_, index) => {
                    const alturaMaxima = alturamax; // Definimos la altura máxima permitida
                    const alturaAleatoria = Math.floor(Math.random() * alturaMaxima) + 'px'; // Generamos una altura aleatoria no mayor a la altura máxima
                    const claseMargen = windowWidth < 768 ? "mr-4" : "mr-6"; // Clase de margen dependiendo del ancho de la ventana
                    return (
                        <div key={index} className={claseMargen} style={{ width: calculateElementWidth() }}>
                            <Skeleton height={alturaAleatoria} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SkeletonChart;
