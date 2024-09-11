# Migrate CSV to DB 

# Índice del proyecto

- [Descripción del proyecto](#descripción-del-proyectohttps://github.com/garzonsergio)
- [Autores](#autores)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Configuración del entorno de desarrollo](#configuración-del-entorno-de-desarrollo)
  - [Instalando Proyecto](#instalando-proyecto)
  - [Instalación de Node.js y NPM/Yarn]

## Descripción del Proyecto

Este proyecto tiene como propósito migrar la información de la bitácora de incendios al módulo de incendios de la página operacional.

El proyecto aprovecha la API de registro de incendios creada para el proyecto de página operacional.


## Autores

- **Sergio Camilo Garzón Pérez** - Desarrollo de Software - **Github:** [@garzonsergio](https://github.com/garzonsergio)


Este proyecto es financiado por el **Área Metropolitana del Valle de Aburrá** (AMVA) y administrado por la **Universidad Eafit**.

#### Contacto: [scgarzonp@eafit.edu.co](mailito:scgarzonp@eafit.edu.co)

## Requisitos del Sistema

Para ejecutar este proyecto asegurate de tener los siguientes requisitos:

### Software

- **Node.js**: Version 14 o superior.
- **npm**: La herramienta de gestion de paquetes de Node.js.

### Dependencias del proyecto

- axios: ^1.7.7
- csv-parser: ^3.0.0
- dayjs: ^1.11.13
- days: ^1.1.1
- dotenv: ^16.4.5
- form-data: ^4.0.0
- node-fetch: ^3.3.2

## Instalando proyecto

1. Clona el repositiorio
```bash 
git clone https://github.com/garzonsergio/migrateCSV.git

cd migratecsv
```

2. Instala las dependencias

```bash
npm install 
```

3. Configura las variables de entorno
  - Crea un archivo .env en la raiz de proyecto y define las variables de entorno necesarias.


