import { environment } from 'environments/environment';

export class HeartUtils {
  private static mensajesAgradecimiento: string[] =
    environment.utils.hearts.messages;

  static obtenerMensajeAleatorio(): string {
    const indiceAleatorio = Math.floor(
      Math.random() * HeartUtils.mensajesAgradecimiento.length
    );
    return HeartUtils.mensajesAgradecimiento[indiceAleatorio];
  }

  static generateHeartSize(): string {
    const size =
      Math.random() * environment.utils.hearts.size.max +
      environment.utils.hearts.size.min +
      'rem';
    return size;
  }

  static generateRedTone(): string {
    const red = Math.floor(
      Math.random() * environment.utils.hearts.maxColor.red
    );
    const green = Math.floor(
      Math.random() * environment.utils.hearts.maxColor.green
    );
    const blue = Math.floor(
      Math.random() * environment.utils.hearts.maxColor.blue
    );
    return `rgb(${red}, ${green}, ${blue})`;
  }

  static createHeart(): void {
    const body = document.querySelector('.heart-rain');
    if (!body) {
      console.error('No se encontró el elemento con la clase "heart-rain".');
      return;
    }

    const heart = document.createElement('div');
    heart.className = `bi ${environment.utils.hearts.bootstrapIcon} heart-kudos`;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.color = HeartUtils.generateRedTone();
    heart.style.animationDuration =
      Math.random() * environment.utils.hearts.duration.max +
      environment.utils.hearts.duration.min +
      's';
    heart.style.fontSize = HeartUtils.generateHeartSize();

    body.appendChild(heart);
  }

  static showHearts(): void {
    const i1 = setInterval(HeartUtils.createHeart, 0);
    const i2 = setInterval(() => {
      const heartArr = document.querySelectorAll('.heart-kudos');
      if (heartArr.length > 200) {
        heartArr[0].remove();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(i1);
      clearInterval(i2);
    }, environment.utils.hearts.duration.max * 1000);
  }
}
