# 📱 React Native App con Expo

## 📌 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (versión recomendada: LTS) 👉 [Descargar aquí](https://nodejs.org/)
- **Git** 👉 [Descargar aquí](https://git-scm.com/)
- **Expo CLI** (Instalar con `npm install -g expo-cli`)

## 🚀 Instalación y configuración

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno:

### 1️⃣ Clonar el repositorio

### 2️⃣ Instalar dependencias

Ejecuta el siguiente comando en la raíz del proyecto:

```sh
 npm install
```

### 3️⃣ Configurar el entorno de desarrollo

#### ➤ Opción 1: Usar un emulador (Android o iOS)

Si prefieres usar un emulador, sigue las instrucciones según tu sistema operativo:

- [Guía oficial](https://reactnative.dev/docs/set-up-your-environment)

#### ➤ Opción 2 (Recomendada): Usar un dispositivo físico

1. Instala la aplicación **Expo Go** en tu teléfono:
   - 📱 [Documentación de descarga](https://docs.expo.dev/get-started/set-up-your-environment/)

### 4️⃣ Ejecutar la aplicación

Una vez configurado el entorno, inicia el servidor de desarrollo con:

```sh
 npm run start
```

Aparecerá un código QR en la terminal. Escanéalo con la app **Expo Go** para ejecutar la aplicación en tu dispositivo. Finalmente verifiquen que se está usando **Expo Go** en consola, caso contrario las indicaciones aparecen en las opciones.

## 📖 Guía de desarrollo

Para mantener un código limpio y consistente, seguimos estas convenciones de nomenclatura:

- **Enums** → PascalCase → `enum UserRole { Admin, User }`
- **Constantes** → UPPER_SNAKE_CASE → `const API_BASE_URL = "..."`
- **Variables y funciones** → camelCase → `const userName = "..."`
- **Componentes de React** → PascalCase → `const UserProfile = () => {...}`
- **Hooks de React** → camelCase → `const useAuth = () => {...}`
- **Stores** → Deben terminar con el sufijo `-store`, por ejemplo: `user-store.tsx`
- **Nombres de archivos** → kebab-case → `este-es-mi-archivo.tsx`
