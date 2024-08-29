# [![RomerART](https://raw.githubusercontent.com/miguelromeral/RomerART-Angular18/master/public/favicon-32x32.png) RomerART](https://miguelromeral.azurewebsites.net/)

Página web en la que muestro dibujos varios que he subido a las redes sociales, con comentarios sobre la forma de hacerlos, motivaciones e incluso características como poder puntuar la calidad de las obras o permitir a los usuarios que envíen su voto.

## 💻 Pantallas Principales

### Pantalla de Inicio

### Galería de Arte

![Galería de Arte](https://raw.githubusercontent.com/miguelromeral/RomerART-Angular18/master/demos/videos/gallery.gif)

Busca dibujos según varios filtros de modelos, temática, estilos, etc. También puedes ordenarlos por diferentes criterios como por fecha de creación, puntuación popular, popularidad y más.

### Detalles del Dibujo

TODO

### Colecciones

TODO

### Conóceme

TODO

### Ajustes

TODO

## 📌 Funcionalidades Destacadas

TODO

### Puntuar Dibujos

TODO

### Cambio de Idioma

TODO

### Responsiveness

La página está diseñada tanto para pantallas pequeñas como para pantallas de escritorio utilizando las diferentes clases que proporciona **Tailwind**.

## 🛠 Detalles Técnicos del Proyecto

Proyecto en [Angular CLI](https://github.com/angular/angular-cli) 18.1.

### Hosting

La aplicación está alojada en un **App Service de Azure** bajo el dominio https://miguelromeral.azurewebsites.net/.

#### Default Documents

La aplicación se ejecuta con Node 32 bits, siendo el documento princial [`index.html`](https://github.com/miguelromeral/RomerART-Angular18/blob/master/src/index.html).

#### Path Mappings

| Virtual Path | Physical Path        | Type        |
| ------------ | -------------------- | ----------- |
| /            | site\wwwroot\browser | Application |

Además, requiere de un [`web.config`](https://github.com/miguelromeral/RomerART-Angular18/blob/master/src/web.config) que es copiado a la carpeta de salida del `ng build` para permitir que las rutas funcionen correctamente en la página SPA.

#### CORS

También hay que configurar el proyecto de Web API (que también está hospedado en Azure) e incluir el dominio de este App Service para permitir las llamadas.

### Configuración del Front-End

Existen varias variable maestras que determinan ciertos aspectos de la aplicación, como la cantidad de dibujos que se recuperan por cada página, el zoom máximo que se permite en las imágenes, etc.

Estas variables están aisladas en la carpeta **[src/config](https://github.com/miguelromeral/RomerART-Angular18/tree/master/src/config)**.
