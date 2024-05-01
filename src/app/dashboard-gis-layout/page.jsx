import SkeletonChart from "@/ui/skeleton/chart";
import { Suspense } from "react";

import GraficoServerRedes from "../(main)/dashboard-gis/componentes/graficoServerRedes";
import DefinedsDates from "@/app/services/deficionesFecha";

export const metadata = {
  title: "Dashboard GIS",
};

export default async function Page({ searchParams }) {
  const defends = DefinedsDates();

  const fecha_inicio = searchParams.fecha_inicio || defends.startOf2023
  const fecha_fin = searchParams.fecha_fin || defends.endOfYear
  const diametro = searchParams.diametro || "todos";
  const tipo = searchParams.tipo || "todos";
  
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-12">
          <div className="card widget-visitor-graph">
            <Suspense
              fallback={<SkeletonChart altura={725}></SkeletonChart>}
              key={fecha_inicio + fecha_fin + diametro + tipo}
            >
              <GraficoServerRedes
                fecha_fin={fecha_fin}
                fecha_inicio={fecha_inicio}
                diametro={diametro}
                tipo={tipo}
              ></GraficoServerRedes>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}