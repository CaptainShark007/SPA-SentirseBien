export const formatearFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
};

export const formatearHora = (hora: string) => {
  return hora.slice(0, 5);
};
