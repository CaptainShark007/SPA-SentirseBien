/**
 * Espera una cantidad de milisegundos antes de continuar.
 * @param ms Número de milisegundos a esperar
 * @returns Una promesa que se resuelve después del tiempo indicado
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
