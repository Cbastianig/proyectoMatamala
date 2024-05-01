
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
export default function DefinedsDates() {

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
        endOflastYear: endOfYear(addYears(new Date(), -1)),
        startOfLastThirteenMonths: startOfMonth(addMonths(new Date(), -13)),
        endOfLastThirteenMonths: endOfMonth(addMonths(new Date(), -12)),
        start10years: startOfYear(addYears(new Date(), -10)),
        end10years: endOfYear(addYears(new Date(), -10)),
        startOf2023: startOfYear(new Date(2023, 0, 1))

    };
    return defineds;
}