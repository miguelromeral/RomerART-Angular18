import { settingLanguage } from 'config/settings/language.config';

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

export function formattedDate(
  date: Date,
  locale: string = settingLanguage.defaultValue
): string {
  if (!date) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString(locale, { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

// TODO: pasarle este valor, hacerlo obligatorio
export function formattedDateMini(
  date: Date,
  locale: string = settingLanguage.defaultValue
): string {
  if (!date) return '';

  const month = date.toLocaleString(locale, { month: 'long' });
  const year = date.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año

  return `${month} '${year}`;
}
