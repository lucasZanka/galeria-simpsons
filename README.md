# Galería de Personajes de Los Simpsons

Aplicación web sencilla que consume la API pública [The Simpsons API](https://thesimpsonsapi.com/) y muestra los personajes de la serie en una galería. Se ejecuta en un contenedor Docker.

## Funcionalidades

- Galería de personajes con retrato, nombre y ocupación (20 por página, 60 páginas).
- Paginación con botones Anterior / Siguiente.
- Filtro por nombre sobre los personajes de la página actual.
- Detalle de cada personaje (edad, género, estado y frases) al hacer clic en su tarjeta.
- Botón **Sorprendeme**: muestra un personaje al azar con una de sus frases.

## Tecnologías

- HTML5, CSS3 y JavaScript (vanilla, sin frameworks ni dependencias).
- [The Simpsons API](https://thesimpsonsapi.com/) como fuente de datos (no requiere autenticación).
- [nginx](https://nginx.org/) (imagen `nginx:alpine`) para servir los archivos estáticos.
- Docker y Docker Compose.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) (incluye Docker Compose v2).
- Conexión a internet, para consultar la API y cargar las imágenes.

## Construir y ejecutar con Docker

### Con Docker Compose (recomendado)

```bash
docker compose up -d --build
```

Luego abrí http://localhost:8080 en el navegador.

Para detener y eliminar el contenedor:

```bash
docker compose down
```

### Solo con Docker

```bash
# Construir la imagen
docker build -t simpsons-galeria .

# Ejecutar el contenedor
docker run -d --name simpsons-galeria -p 8080:80 simpsons-galeria
```

Luego abrí http://localhost:8080. Para detenerlo:

```bash
docker rm -f simpsons-galeria
```

## Estructura del proyecto

```
.
├── index.html           # Estructura de la página
├── styles.css           # Estilos
├── app.js               # Lógica: consumo de la API, paginación, filtro y "Sorprendeme"
├── Dockerfile           # Imagen basada en nginx:alpine
├── docker-compose.yml   # Expone el sitio en el puerto 8080
└── .dockerignore
```
