
import { useState } from 'react';

export function usePaginator({ first = 0, rows = 25, savestorage = null }) {
    const tableName = savestorage


    const [paginatorData, setPaginatorData] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem("paginationData")) || {};
        return { ...storedData };
    });
    const initialFirst = paginatorData[tableName] ? paginatorData[tableName].first : first;
    const initialRows = paginatorData[tableName] ? paginatorData[tableName].rows : rows;
    const [firstState, setFirst] = useState(initialFirst);
    const [rowsState, setRows] = useState(initialRows);
    const rowsPerPage = Array.from({ length: 6 }, (_, index) => (index + 1) * rows);
    const onPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        if (savestorage) {

            const { first, rows } = event;
            const tablePaginatorData = paginatorData[tableName] || {};

            const newTablePaginatorData = { ...tablePaginatorData, first, rows };
            const newPaginatorData = { ...paginatorData, [tableName]: newTablePaginatorData };

            setPaginatorData(newPaginatorData);
            localStorage.setItem("paginationData", JSON.stringify(newPaginatorData));
        }
    };

    const resetFirstState = () => {

        setFirst(0);
        const newTablePaginatorData = { ...paginatorData[tableName], first: 0, rows: rowsState };
        const newPaginatorData = { ...paginatorData, [tableName]: newTablePaginatorData };

        setPaginatorData(newPaginatorData);
        localStorage.setItem("paginationData", JSON.stringify(newPaginatorData));
    };


    return { first: firstState, rows: rowsState, onPage, resetFirstState, rowsPerPage };
}