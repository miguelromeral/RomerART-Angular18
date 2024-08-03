export class TextUtils {
  static formatoLegible(numero: number): string {
    const UN_MILLON = 1000000;
    const MIL = 1000;

    if (numero < MIL) {
      return numero.toString();
    } else if (numero < UN_MILLON) {
      const valorFormateado = Math.round((numero / MIL) * 10) / 10;
      return `${valorFormateado} k`;
    } else {
      const valorFormateado = Math.round((numero / UN_MILLON) * 10) / 10;
      return `${valorFormateado} M`;
    }
  }
}

export function getHumanTimeFromMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMins}min`;
  } else {
    return `${remainingMins}min`;
  }
}
