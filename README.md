# Equipo de desarrollo
- Douglas Conejo Cascante
- Elizabeth Sequeira Suárez
- Steven Montoya Calderón
- Andrés Quesada Arias
- Diego Fiatt Vargas

# Descripción del Proyecto
Organizar un evento es un proceso fragmentado y poco eficiente. Actualmente, los usuarios deben buscar, contactar y coordinar con múltiples proveedores de manera independiente, lo que genera una gran inversión de tiempo y esfuerzo. Además, la falta de una plataforma centralizada dificulta la comparación de precios, disponibilidad y calidad del servicio, lo que puede llevar a experiencias insatisfactorias o a sobrecostos inesperados.

La solución propuesta es una aplicación móvil que centraliza todos los servicios necesarios para la organización de eventos. A través de esta plataforma, los usuarios podrán buscar lugares según su presupuesto y número de invitados, reservar espacios con fecha y hora específica, contratar servicios de comida y entretenimiento.

# Requisitos Iniciales
### Requisitos funcionales
#### Gestión de Usuarios y Autenticación
- El sistema debe permitir el registro de usuarios mediante correo electrónico y contraseña.
- El sistema debe permitir al usuario ingresar con su correo electrónico y contraseña.
- El sistema debe permitir la recuperación de contraseña mediante "¿Olvidaste tu contraseña?".
- Los usuarios deben poder gestionar su perfil personal.
#### Gestión de Eventos
- Los usuarios clientes y administradores deben poder crear eventos con la siguiente información:
  - Nombre del evento
  - Fecha y hora
  - Ubicación
  - Proveedor y selección de comida 
  - Entretenimiento
  - Capacidad máxima
  - Imágenes para invitación del evento
  - Descripción
  - Categoría del evento
- Búsqueda y Visualización de Eventos
- Los usuarios clientes y administradores deben poder buscar eventos mediante filtros:
  - Tipo de evento
  - Ubicación
- El sistema debe mostrar los eventos en formato de lista con imágenes y detalles básicos como nombre, fecha, hora y lugar
- Los usuarios clientes deben poder ver detalles completos de los eventos que les pertenezcan.
- Los usuarios administradores deben poder ver detalles completos de cada evento existente.
#### Sistema de Reservas
- Los usuarios deben poder seleccionar fecha y hora específica para su reserva
- Al momento de que el usuario intenta hacer una reservación de un evento, el sistema debe validar la disponibilidad de fechas.
- El sistema debe generar confirmaciones de reserva
- Los usuarios deben poder ver el historial de sus reservas
- El sistema debe mostrar un carrito en donde se muestran los detalles de los eventos reservados por el usuario
- El sistema debe mostrar al usuario una invitación luego de haber realizado el pago del evento
- El sistema debe permitir compartir la invitación del evento
### Requisitos no funcionales
#### Rendimiento
- La aplicación debe cargar en menos de 3 segundos
- Las búsquedas deben mostrar resultados en menos de 2 segundos
- El sistema debe soportar al menos 1000 usuarios concurrentes
- La aplicación debe funcionar sin interrupciones 24/7
#### Seguridad
- Las contraseñas deben almacenarse utilizando algoritmos de hash seguros
- Las rutas tanto en la interfaz de usuario como en la api deben estar protegidas por permisos de usuario.
#### Usabilidad
- La interfaz debe ser intuitiva y fácil de usar
- La aplicación debe ser responsive y adaptarse a diferentes tamaños de pantalla
- La aplicación debe seguir las guías de diseño de iOS y Android
- El sistema debe proporcionar feedback claro sobre las acciones realizadas
#### Compatibilidad
La aplicación debe funcionar en iOS 13 o superior
La aplicación debe funcionar en Android 8.0 o superior

# Diseño de la Base de Datos
![BD-DEV5 (2)](https://github.com/user-attachments/assets/ed6c6cb6-002d-4a3d-a1b1-f40e750a1a20)

# Diagrama de Arquitectura
![Diagrama-de-Arquitectura (2)](https://github.com/user-attachments/assets/099ea7bf-ab1f-46db-bbb8-1b3740ccb04e)

# Tecnologías utilizadas
- React Native
- Springboot

# Manual de Usuario

#### 🧩 ¿Qué puedes hacer?

- Manejar eventos  
  <br />
  <img width="245" alt="image" src="https://github.com/user-attachments/assets/8d64d19b-bea4-4f58-99bf-09f1ce850b36" />

  Sin eventos? Crea uno  
  <br />
  <img width="244" alt="image" src="https://github.com/user-attachments/assets/74d35041-d239-4b50-96b7-626a34a65cbb" />

- Reservar lugares  
  <br />
  <img width="245" alt="image" src="https://github.com/user-attachments/assets/a7d37b2f-916a-44a4-8f36-b9fde4394c6b" />

- Agregar productos (como pizzas) a tu carrito, y todo lo que necesites para el evento  
  <br />
  <img width="245" alt="image" src="https://github.com/user-attachments/assets/81a62c4d-5795-435f-85d3-9de3dae5bc62" />
  <br />
  <img width="246" alt="image" src="https://github.com/user-attachments/assets/1b8b7830-558c-45aa-8a15-d6ea943d01f5" />

- Llevar monitoreo de eventos activos  
  <br />
  <img width="245" alt="image" src="https://github.com/user-attachments/assets/0eace813-ad2b-4816-bd5b-69b319e543a4" />

  # 📱 React Native App con Expo - Manual de Instalación

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

### 4️⃣ Variables de ambiente
```sh
EXPO_PUBLIC_API_URL=https://dev5-back-end-ypiu.onrender.com
```

## 📖 Guía de desarrollo

Para mantener un código limpio y consistente, seguimos estas convenciones de nomenclatura:

- **Enums** → PascalCase → `enum UserRole { Admin, User }`
- **Constantes** → UPPER_SNAKE_CASE → `const API_BASE_URL = "..."`
- **Variables y funciones** → camelCase → `const userName = "..."`
- **Componentes de React** → PascalCase → `const UserProfile = () => {...}`
- **Hooks de React** → camelCase → `const useAuth = () => {...}`
- **Stores** → Deben terminar con el sufijo `-store`, por ejemplo: `user-store.tsx`
- **Nombres de archivos** → kebab-case → `este-es-mi-archivo.tsx`
