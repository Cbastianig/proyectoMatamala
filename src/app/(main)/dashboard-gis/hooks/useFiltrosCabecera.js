import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function useFiltrosCabecera({}) {
  const [fechaFiltro, setFechaFiltro] = useState(null);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const handleclickBuscar2 = (event) => {
    const params = new URLSearchParams(searchParams);
    if (fechaFiltro) {
      params.set("fecha_inicio", fechaFiltro.selection.startDate);
      params.set("fecha_fin", fechaFiltro.selection.endDate);
    } else {
      params.delete("fecha_fin");
      params.delete("fecha_inicio");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const changeSistemaChart = useDebouncedCallback((value, select) => {
    const params = new URLSearchParams(searchParams);
    if (select === "tipo") {
      params.set("tipo", value);
    }
    if (select === "diametro") {
      params.set("diametro", value);
    } else if (select === "tipo") {
      params.set("tipo", value);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return { handleclickBuscar2, setFechaFiltro, changeSistemaChart };
}