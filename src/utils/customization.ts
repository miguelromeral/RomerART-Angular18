export class Customization {
  public static getClassScore(score: number): string {
    if (score === 0) {
      return '';
    } else if (score < 50) {
      return 'mr-score-bad';
    } else if (score < 65) {
      return 'mr-score-mild';
    } else if (score < 95) {
      return 'mr-score-good';
    } else if (score < 101) {
      return 'mr-score-platinum';
    }
    return '';
  }
}
