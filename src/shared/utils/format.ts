export const formatearFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
};

export const formatearHora = (hora: string) => {
  return hora.slice(0, 5);
};

export const formatearPrecio = (precio: number) => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(precio);
};
