import { heartsAnimationConfig } from 'config/customization/heart-animation.config';

export class HeartUtils {
  private static mensajesAgradecimiento: string[] =
    heartsAnimationConfig.messages;

  static obtenerMensajeAleatorio(): string {
    const indiceAleatorio = Math.floor(
      Math.random() * HeartUtils.mensajesAgradecimiento.length
    );
    return HeartUtils.mensajesAgradecimiento[indiceAleatorio];
  }

  static generateHeartSize(): string {
    const size =
      Math.random() * heartsAnimationConfig.size.max +
      heartsAnimationConfig.size.min +
      'rem';
    return size;
  }

  static generateRedTone(): string {
    const red = Math.floor(Math.random() * heartsAnimationConfig.maxColor.red);
    const green = Math.floor(
      Math.random() * heartsAnimationConfig.maxColor.green
    );
    const blue = Math.floor(
      Math.random() * heartsAnimationConfig.maxColor.blue
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
    heart.className = `bi ${heartsAnimationConfig.bootstrapIcon} heart-kudos`;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.color = HeartUtils.generateRedTone();
    heart.style.animationDuration =
      Math.random() * heartsAnimationConfig.duration.max +
      heartsAnimationConfig.duration.min +
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
    }, heartsAnimationConfig.duration.max * 1000);
  }
}
