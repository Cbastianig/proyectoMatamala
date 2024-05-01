import DefinedsDates from '@/app/services/deficionesFecha';
import { useEffect, useRef, useState } from 'react'
import { createStaticRanges } from 'react-date-range'



export function useRange({ nombre_range, filter_inicio_fecha }) {
    
    const defineds = DefinedsDates();
    
    const get_range = () => {
        let savedRange = typeof window !== 'undefined' ? window.localStorage.getItem(nombre_range) : null;
        if (filter_inicio_fecha) return filter_inicio_fecha
        if (savedRange) {
          
            savedRange = JSON.parse(savedRange)
            
            const start_date = new Date(savedRange.startDate);
            const end_date = new Date(savedRange.endDate);

            return [
                {
                    startDate: start_date,
                    endDate: end_date,
                    key: 'selection'
                }
            ];
        }
       
        return [
            {
                startDate: defineds.startOfWeek,
                endDate: defineds.endOfWeek,
                key: 'selection'
            }
        ];


    }
    // date state
    const [range, setRange] = useState(get_range())

    // open close
    const [open, setOpen] = useState(false)

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {

        if (e.key === "Escape") {
            setOpen(false)
        }
    }
    // Hide dropdown on outside click
    const hideOnClickOutside = (e) => {

        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }


    const sideBarOptions = () => {
        const customDateObjects = [
            {
                label: 'Hoy',
                range: () => ({
                    startDate: defineds.startOfToday,
                    endDate: defineds.endOfToday
                }), isSelected() {
                    return false;
                }

            },
            {
                label: 'Esta semana',
                range: () => ({
                    startDate: defineds.startOfWeek,
                    endDate: defineds.endOfWeek
                })
            },
            {
                label: 'Semana Pasada',
                range: () => ({
                    startDate: defineds.startOfLastWeek,
                    endDate: defineds.endOfLastWeek
                })
            },
            {
                label: 'Este mes',
                range: () => ({
                    startDate: defineds.startOfMonth,
                    endDate: defineds.endOfMonth
                })
            },
            {
                label: 'Mes pasado',
                range: () => ({
                    startDate: defineds.startOfLastMonth,
                    endDate: defineds.endOfLastMonth
                })
            },
            {
                label: 'Este año',
                range: () => ({
                    startDate: defineds.startOfYear,
                    endDate: defineds.endOfYear
                })
            },
            {
                label: 'Año pasado',
                range: () => ({
                    startDate: defineds.startOflastYear,
                    endDate: defineds.endOflastYear
                })
            },
            {
                label: 'Ultimos 13 meses',
                range: () => ({
                    startDate: defineds.startOfLastThirteenMonths,
                    endDate: defineds.endOfMonth
                })
            }
        ];

        return customDateObjects;
    };

    const change_range = (item) => {
        setRange([item.selection])

    }


    const sideBar = sideBarOptions();
    const staticRanges = [

        ...createStaticRanges(sideBar)
    ];

    const handleclick = (e) => {
        e.preventDefault();
        setOpen(open => !open);
    }

    return { range, change_range, open, staticRanges, handleclick, refOne }


}

