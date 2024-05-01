
import { useState } from 'react';
import { FilterMatchMode, FilterOperator } from "primereact/api";
export function useGlobal_filter() {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        estado_patrullaje: { value: null, matchMode: FilterMatchMode.EQUALS }

    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    return { onGlobalFilterChange, filters, globalFilterValue };
}