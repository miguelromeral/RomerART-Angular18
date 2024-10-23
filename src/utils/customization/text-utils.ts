export class TextUtils {
  static formatoLegible(numero: number): string {
    const UN_MILLON = 1000000;
    const MIL = 1000;

    if (numero < MIL) {
      return numero.toString();
    } else if (numero < UN_MILLON) {
      const valorFormateado = Math.round((numero / MIL) * 10) / 10;
      return `${valorFormateado}k`;
    } else {
      const valorFormateado = Math.round((numero / UN_MILLON) * 10) / 10;
      return `${valorFormateado}M`;
    }
  }
}

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440; // 24 * 60
const MINUTES_IN_WEEK = 10080; // 7 * 24 * 60
const MINUTES_IN_MONTH = 43800; // Aproximadamente 30.4 días * 24 * 60

export function getHumanTimeFromMinutes(minutes: number): string {
  const months = Math.floor(minutes / MINUTES_IN_MONTH);
  minutes %= MINUTES_IN_MONTH;

  const weeks = Math.floor(minutes / MINUTES_IN_WEEK);
  minutes %= MINUTES_IN_WEEK;

  const days = Math.floor(minutes / MINUTES_IN_DAY);
  minutes %= MINUTES_IN_DAY;

  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  minutes %= MINUTES_IN_HOUR;

  const textMonths = 'mo';
  const textWeeks = 'w';
  const textDays = 'd';
  const textHours = 'h';
  const textMins = 'min';

  let result = '';

  if (months > 0) {
    result += `${setTimeValue(months, textMonths)} `;
  }
  if (weeks > 0) {
    result += `${setTimeValue(weeks, textWeeks)} `;
  }
  if (days > 0) {
    result += `${setTimeValue(days, textDays)} `;
  }
  if (hours > 0) {
    result += `${setTimeValue(hours, textHours)} `;
  }
  result += setTimeValue(minutes, textMins);

  return result.trim();
}

function setTimeValue(value: number, text: string): string {
  return value > 0 ? `${value}${text}` : '';
}
