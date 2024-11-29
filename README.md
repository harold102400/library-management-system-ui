
# Librería de Libros

Este proyecto es una aplicación web de librería creada con React TypeScript y Vite. Permite a los usuarios iniciar sesión, registrarse, y gestionar libros (crear, editar, eliminar y ver).

## Requisitos

- Node.js (versión 16 o superior)
- npm o yarn (administrador de paquetes)
- Un servidor para el backend (PHP vanilla)

## Instalación del Frontend

Sigue estos pasos para ejecutar la aplicación frontend en tu máquina local.

### 1. Clonar el repositorio

Primero, clona el repositorio del proyecto:

```bash
git clone https://ruta-del-repositorio.git
```

### 2. Instalación de dependencias

Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

```bash
cd carpeta-del-proyecto
npm install
```

Si prefieres usar `yarn`:

```bash
yarn install
```

### 3. Configuración del archivo .env

Crea un archivo `.env` en la raíz del proyecto frontend y agrega las variables necesarias, como la URL del backend (asegurándote de que tu backend esté corriendo):

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Ejecutar el proyecto

Finalmente, ejecuta el siguiente comando para iniciar el servidor de desarrollo de Vite:

```bash
npm run dev
```

O si usas `yarn`:

```bash
yarn dev
```

Esto abrirá la aplicación en tu navegador en `http://localhost:5173` (por defecto).

## Backend (PHP Vanilla)

Asegúrate de tener el backend corriendo. Puedes seguir las instrucciones en el repo del backend para configurarlo y ejecutarlo.

- El backend está desarrollado en PHP vanilla y utiliza JWT para autenticación.
- Usa un servidor web como Apache o Nginx, y configura tu entorno para que apunte a la carpeta donde tienes el código PHP.

## Funcionalidades

### - Autenticación
El sistema utiliza JWT para autenticar usuarios. Puedes registrarte, iniciar sesión y obtener un token de acceso para interactuar con las rutas protegidas del backend.

### - Gestión de Libros
Los usuarios pueden:
- Crear libros
- Editar libros
- Eliminar libros
- Ver todos los libros en la librería
