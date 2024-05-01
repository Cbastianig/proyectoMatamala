import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as locales from 'react-date-range/dist/locale';
import format from 'date-fns/format'
import { DateRangePicker } from "react-date-range";
import { useRange } from "@/hooks/useRange";
export default function InputFilterDate({ nombre_range, handleclickBuscar, setFecha, filter_inicio_fecha }) {
  
  

    const { range, change_range, open, staticRanges, handleclick, refOne } = useRange({ nombre_range, filter_inicio_fecha });
    return (
        <>
            <div className="calendarWrap">
                <div className="p-inputgroup flex-1">
                    <InputText  className="" value={`${format(range[0].startDate, "dd-MM-yyyy")} - ${format(range[0].endDate, "dd-MM-yyyy")}`} readOnly={true} onClick={handleclick} />
                    <Button icon="pi pi-search" onClick={handleclickBuscar ? handleclickBuscar : () => { }} />
                </div>
                <div ref={refOne}>
                    {open && (
                        <DateRangePicker
                            onChange={(item) => { change_range(item); setFecha(item) }}
                            editableDateInputs={false}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            months={2}
                            direction="horizontal"
                            className="calendarElement"
                            locale={locales['es']}
                            inputRanges={[]}
                            staticRanges={staticRanges}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
