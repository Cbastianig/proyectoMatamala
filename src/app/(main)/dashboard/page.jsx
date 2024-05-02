
import { getDataYear, getDataYearTotalVenta, getDataYearsCantidadompras, readDataProductos } from "@/app/lib/dashboard/actions";
import GraficoCategoriaCompras from "./componenetes/graficoCategoriaCompras";
import GraficoTotalventas from "./componenetes/graficoTotalventas";
import GraficoTotalCompras from "./componenetes/graficoCompras";




export const metadata = {
    title: 'Dashboard - Matamala',
}




export default async function Page({ searchParams }) {

    const [data, datayear] = await Promise.all([readDataProductos(), getDataYear()])
    const years = [...new Set(datayear.map((item) => item.anio_compra))].map((item) => parseInt(item))
    const yearsOptions  = years.map((item) => ({ name: item, value: item }))


    const categoraisOptions = [{ name: 'Mecanico', value: 3 }, { name: 'Estructuras', value: 2 },{ name: 'Electrico', value: 1 }]
    return (<>

        <div className="grid">
            <div className="col-12 md:col-12">
                <div className="card widget-visitor-graph">
                    <GraficoCategoriaCompras categoraisOptions={categoraisOptions} datayear={datayear} data={data}></GraficoCategoriaCompras>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card ">

                    <GraficoTotalventas  fetchData={getDataYearTotalVenta} categoraisOptions={categoraisOptions} yearsOptions={yearsOptions}  data={data}></GraficoTotalventas>

                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card ">

                  <GraficoTotalCompras fetchData={getDataYearsCantidadompras} categoraisOptions={categoraisOptions} yearsOptions={yearsOptions}  data={data}></GraficoTotalCompras>

                </div>
            </div>
        </div>



    </>

    );
}

