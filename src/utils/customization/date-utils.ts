export function yearsDifference(fechaInicio: Date, fechaFin: Date): number {
  let diferenciaEnAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
  const mesFin = fechaFin.getMonth();
  const mesInicio = fechaInicio.getMonth();

  // Si la fecha de fin es antes de la fecha de inicio en el año, resta un año
  if (
    mesFin < mesInicio ||
    (mesFin === mesInicio && fechaFin.getDate() < fechaInicio.getDate())
  ) {
    diferenciaEnAnios--;
  }

  return diferenciaEnAnios;
}
