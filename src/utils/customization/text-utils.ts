export class TextUtils {
  static formatoLegible(numero: number): string {
    const UN_MILLON = 1000000;
    const MIL = 1000;

    if (numero < MIL) {
      return numero.toString();
    } else if (numero < UN_MILLON) {
      return `${Math.round(numero / MIL)} k`;
    } else {
      return `${Math.round(numero / UN_MILLON)} M`;
    }
  }
}
