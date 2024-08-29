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

export function formattedDate(date: Date, locale: string): string {
  if (!date) return '';

  return `${date.toLocaleString(locale, { month: 'long', year: 'numeric', day: 'numeric' })}`;
}

export function formattedDateMini(
  date: Date,
  locale: string,
  format: string
): string {
  if (!date) return '';

  switch (format) {
    case 'month-yy': {
      const month = date.toLocaleString(locale, { month: 'long' });
      const year = date.getFullYear().toString().slice(-2);

      return `${month} '${year}`;
    }
    case 'mm/yy': {
      const month = date.toLocaleString(locale, { month: '2-digit' });
      const year = date.getFullYear().toString().slice(-2);

      return `${month}/'${year}`;
    }
    case 'yy/mm': {
      const month = date.toLocaleString(locale, { month: '2-digit' });
      const year = date.getFullYear().toString().slice(-2);

      return `${year}/${month}`;
    }
  }
  return '';
}
