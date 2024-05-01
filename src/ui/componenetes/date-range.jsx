import { useEffect, useRef, useState } from 'react'
import { DateRangePicker, createStaticRanges } from 'react-date-range'
import * as locales from 'react-date-range/dist/locale';
import format from 'date-fns/format'

import {
    addDays,
    subDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    startOfYear,
    endOfYear,
    addYears
} from 'date-fns';


import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const DateRangePickerComp = () => {

    // date state
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

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
    const defineds = {
        startOfWeek: startOfWeek(new Date()),
        endOfWeek: endOfWeek(new Date()),
        startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
        endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
        startOfToday: startOfDay(new Date()),
        startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
        startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
        startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
        endOfToday: endOfDay(new Date()),
        startOfYesterday: startOfDay(addDays(new Date(), -1)),
        endOfYesterday: endOfDay(addDays(new Date(), -1)),
        startOfMonth: startOfMonth(new Date()),
        endOfMonth: endOfMonth(new Date()),
        startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
        endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
        startOfYear: startOfYear(new Date()),
        endOfYear: endOfYear(new Date()),
        startOflastYear: startOfYear(addYears(new Date(), -1)),
        endOflastYear: endOfYear(addYears(new Date(), -1))
    };

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
            }
        ];

        return customDateObjects;
    };


    const sideBar = sideBarOptions();
    const staticRanges = [

        ...createStaticRanges(sideBar)
    ];
 
    const handleclick = (e) => {
        e.preventDefault();
        setOpen(open => !open);
    }

   
}

export default DateRangePickerComp;