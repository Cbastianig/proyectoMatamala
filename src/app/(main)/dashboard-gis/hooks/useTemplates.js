import DefinedsDates from "@/app/services/deficionesFecha";

export default function useTemplates({ fecha_inicio, fecha_fin }) {
  const itemTemplate = (option) => {
    return <div>{option.value}</div>;
  };

  const itemTemplateRedes = (customer) => {
    return (
      <div className="card mr-3">
        <div className="customer-item-content text-center">
          <div>
            <h6 className="text-color-secondary">{customer.comuna}</h6>
            <h3 className="mt-0 mb-3">{customer.total}</h3>
          </div>
        </div>
      </div>
    );
  };

  const getTipos = [
    { name: "T", value: "Terciaria" },
    { name: "S", value: "Secundaria" },
    { name: "P", value: "Primaria" },
  ];
  const carouselResponsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const parsedFechaInicio = fecha_inicio ? new Date(fecha_inicio) : null;
  const parsedfechafin = fecha_fin ? new Date(fecha_fin) : null;

  const defineds = DefinedsDates();

  const filter_inicio_fecha = [
    {
      startDate: parsedFechaInicio || defineds.startOf2023,
      endDate: parsedfechafin || defineds.endOfYear,
      key: "selection",
    },
  ];

  return {
    itemTemplate,
    itemTemplateRedes,
    getTipos,
    carouselResponsiveOptions,
    filter_inicio_fecha,
  };
}