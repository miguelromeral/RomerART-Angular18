export class HeartUtils {
  private static mensajesAgradecimiento: string[] = [
    'Muchas gracias por el like 😉',
    'Tú sí que eres una obra de arte 😁',
    'Eres muy amable, ¡gracias! 😘',
    'Significa mucho para mí 🥺',
    'Todos estos corazones son tuyos 💖',
    '¡Gracias, gracias, gracias! 🙏',
    'Me alegro de que te guste 😊',
    '¿Le diste sin querer? aún así, ¡gracias! 😂',
    'Haré saber al modelo que le gustas 🙊',
    'Eres muy grande 🙂',
    '¡Gracias, un abrazo! 🤗',
    '¡Gracias por tocar 2 veces la imagen! ✌',
    'Gracias, generoso 😏',
    'Gracias, eres un sol ☀',
    'Se te cayó esto, mi rey 👑',
    'Se te cayó esto, mi reina 👑',
    'Mereció la pena dibujarlo por esto 🥰',
    '¿Tienes curiosidad por ver todas las frases? 🙃',
    "Eres mu' salao' 🧂",
    '¡Gracias! 😁',
    'Thank you! 😎',
    'Si apagas la pantalla ahora, verás algo más bello aún 😜',
    '¡Gracias! No olvides ver el resto de la galería 🖼',
  ];

  static obtenerMensajeAleatorio(): string {
    const indiceAleatorio = Math.floor(
      Math.random() * HeartUtils.mensajesAgradecimiento.length
    );
    return HeartUtils.mensajesAgradecimiento[indiceAleatorio];
  }

  static generateHeartSize(): string {
    const size = Math.random() * 1.5 + 0.5 + 'rem';
    return size;
  }

  static generateRedTone(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 50);
    const blue = Math.floor(Math.random() * 50);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  static createHeart(): void {
    const body = document.querySelector('.heart-rain');
    if (!body) {
      console.error('No se encontró el elemento con la clase "heart-rain".');
      return;
    }

    const heart = document.createElement('div');
    heart.className = 'bi bi-suit-heart-fill heart-kudos';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.color = HeartUtils.generateRedTone();
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = HeartUtils.generateHeartSize();

    body.appendChild(heart);
  }

  static showHearts(timeMsDelayLike: number): void {
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
    }, timeMsDelayLike);
  }
}
