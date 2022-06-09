<!--
title: 'Desafío Zoluxiones'
description: 'Este proyecto es la implementación del reto propuesto por Zoluxiones'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/DiegoMego'
authorName: 'Diego Mego'
-->

# Desafío Zoluxiones

Este proyecto es la implementación del reto propuesto por Zoluxiones

## Uso

### Pre-requisitos

Se debe tener configurado en el archivo local de credenciales de aws, un usuario con permisos para poder crear tablas en Dynamo, así como guardar y obtener registros.
Además, el usuario deberá tener los permisos suficientes para gestionar API Gateway y Lambdas.

### Ejecutar en local:

Se puede ejecutar localmente y probar los endpoints con la ayuda de una herramienta como Postman.

```
$ npm install
$ npm run offline
```

Los endpoints son:
- http://localhost:3000/swapi
  - Este endpoint acepta los siguientes parámetros get:
    - type (string): acepta sólo 'swapi' o 'list' (este último es para retornar los datos de dynamo). REQUERIDO.
    - id (number): si el 'type' es 'swapi', este id se usa en el endpoint de SWAPI para retornar una persona. OPCIONAL.
    - page (number): si el 'type' es 'swapi', se usa para indicar el número de página. Esto retorna la lista de personas paginadas usando SWAPI. OPCIONAL.
    - Si el 'type' es 'swapi' y no se suministra otro parámetro, se asume por defecto 'page=1'. Si el 'type' es 'list', se retorna los registros almacenados en DynamoDB.
- http://localhost:3000/
  - Este es el endpoint para guardar un registro en dynamo. Se requieren los siguientes parámetros post:
    - nombre (string): REQUERIDO.
    - edad: (number): REQUERIDO.
    - genero: acepta sólo 'M' o 'F'. REQUERIDO.

### Despliegue

```
$ npm install
$ npm run deploy
```
