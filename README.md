# Proyecto de URL Shortener Microservice

Este proyecto es un requisito para obtener la certificación de Back End Development and APIs en Free Code Camp. El objetivo del proyecto es crear un microservicio que acorte las URL.

## Instrucciones:

## Para ejecutar el proyecto, siga los siguientes pasos:

Instale las dependencias ejecutando el siguiente comando:
```
npm install
```

Inicie el servidor ejecutando el siguiente comando:
```
npm start
```

El servidor se iniciará en el puerto 3000. Puede acceder al microservicio en la siguiente URL:
```
http://localhost:3000/
```

## Uso:

Para acortar una URL, envíe una solicitud POST a la ruta `/api/shorturl/:short_url`, el cuerpo de la solicitud debe contener un objeto JSON con el siguiente formato:

```json
{
    "short_url": "https://www.example.com"
}
```

La respuesta será un objeto JSON con la siguiente información:

```json
{
    "original_url": "https://www.google.com",
    "short_url": "vecyqasb"
}
```

Para acceder a la URL acortada, puede realizar una peticion GET a la ruta `/api/shorturl/:short_url`. En este ejemplo, la URL acortada es `/api/shorturl/vecyqasb`. Por lo tanto, será re direccionado a la URL original.
