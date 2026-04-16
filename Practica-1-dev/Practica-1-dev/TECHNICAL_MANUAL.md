# Manual Técnico y de Arquitectura - Task Manager

Este documento está diseñado como una guía central para cualquier desarrollador (o colaborador) que necesite entender cómo funciona el sistema por dentro, qué tecnologías lo componen y dónde debe tocar código para implementar futuras mejoras.

> [!NOTE]
> La aplicación utiliza el conjunto de tecnologías conocido como **MERN Stack** (MongoDB, Express, React, Node.js) y está automatizada al 100% con **Docker**.

---

## 🏗️ 1. Arquitectura General y Docker

Todo el sistema está orquestado por un único archivo que une las tres piezas fundamentales del software.

### `docker-compose.yml` (Ubicado en la raíz)
Es el "director de orquesta". Define tres servicios aislados que se comunican a través de una red interna de Docker:
1. **`mongo`**: Descarga la base de datos oficial de MongoDB y la levanta en el puerto 27017.
2. **`backend`**: Construye el servidor Express leyendo la carpeta `backend` y lo levanta en el puerto 5000. Depende de `mongo` para arrancar.
3. **`frontend`**: Construye la aplicación React (Vite) de la carpeta `fronted` y la expone en el puerto 3000.

---

## ⚙️ 2. El Backend (Lógica del Servidor)

Ubicado en la carpeta `/backend`. Es el responsable de validar reglas y hablar con la base de datos.
Entorno de ejecución: **Node.js**

### Librerías Principales (`backend/package.json`)
* **`express`**: El marco de trabajo (framework) para crear el servidor web y los "endpoints" o URLs de tu API.
* **`mongoose`**: La herramienta (ODM) que permite interactuar con la base de datos de MongoDB usando comandos en JavaScript sin lidiar con consultas complejas.
* **`cors`**: Un mecanismo de seguridad fundamental que le da permiso al Frontend (puerto 3000) de acceder al Backend (puerto 5000) sin que el navegador bloquee la conexión.

### Archivos de Código Clave (Dónde realizar cambios)

* **`backend/src/server.js`**
  Es el núcleo del backend. Aquí se inician los servicios, se conecta a la base de datos MongoDB (`mongodb://mongo:27017/tasks`) y se importan las rutas. *Solo modifícalo si vas a agregar dependencias globales u otra base de datos.*

* **`backend/src/models/...`**
  Aquí se definen las "tablas" o "esquemas" de tu base de datos. Actualmente deberías tener un archivo `Task.js` o similar que le dice a Mongo qué campos lleva una tarea (ej. Título, Completado). *Si a futuro quieres que las tareas tengan obligatoriamente "Fecha_de_Termino", debes agregarlo aquí.*

* **`backend/src/routes/tasks.js`**
  **Aquí es donde está tu API REST.** Todas las direcciones URL que puede consultar el Frontend están programadas aquí (ej. `router.get("/")`, `router.post("/")`). *Si quieres añadir una ruta para borrar o editar una tarea, este es el lugar exacto.*

---

## 🎨 3. El Frontend (Interfaz de Usuario)

Ubicado en la carpeta `/fronted`. Todo lo que el usuario ve, clickea y usa está programado aquí.
Construido con: **React** (Empaquetado por **Vite**)

### Librerías Principales (`fronted/package.json`)
* **`react` y `react-dom`**: La biblioteca principal de Meta (Facebook) para crear componentes visuales en pantalla.
* **`axios`**: Una librería muy popular para realizar peticiones HTTP. Es tu "puente" que contacta a la API del backend para enviar o pedir datos.

### Archivos de Código Clave (Dónde realizar cambios)

* **`fronted/src/api.js`**
  Contiene la configuración base de conexión al backend. Establece `baseURL: "http://localhost:5000/api"`. Si el día de mañana contratas un servidor en la nube (AWS), se cambia esta URL.

* **`fronted/src/App.jsx`**
  Esta es tu **"Vista Principal"**. Aquí está programada la interfaz moderna de Task Manager, los botones, los campos de ingreso de texto y la lógica de estado de React (`useState` y `useEffect`).
  * *¿Quieres poner un botón nuevo?* Lo pones en el `return` de este archivo.
  * *¿Quieres hacer que al presionar "Enter" se abra una alerta?* Creas la función aquí mismo.

* **`fronted/src/index.css`**
  La hoja de estilos principal. Contiene todas las directivas de diseño: gradientes de fondo, tarjetas estilo cristal (glassmorphism), y animaciones (como `fade-in`).

* **`fronted/Dockerfile`**
  Contiene las instrucciones de Multistage Building; cuando haces `docker compose up`, primero transpila el código de React/Vite (`npm run build`) en Node versión 20, y luego usa un contenedor super liviano (Alpine) para mantener tu diseño al aire usando la librería `serve`.

---

## 🔮 4. Sugerencias y Futuros Cambios

Si tienes en mente seguir escalando la aplicación junto a tu colaborador, estas son las áreas de impacto que podrían explorar:

1. **Agregar botón de "Borrar Tarea":**
   * *En el Back:* Abrir `backend/src/routes/tasks.js` y hacer un `router.delete("/:id")`.
   * *En el Front:* Añadir un botón rojo en `App.jsx`, vincularlo a una función, y usar `API.delete('/tasks/XYZ')` desde `axios`.
2. **Sistema de Usuarios y Login:**
   * Se requiere crear un nuevo modelo `User.js` en el backend para almacenar contraseñas (encriptadas con `bcrypt`).
   * Habría que añadir validaciones JWT (JSON Web Tokens) en tu servidor `server.js` para proteger rutas.
3. **Persistencia Visual en Checkboxes:**
   * Crear la ruta `router.put('/:id')` en tu API paral actualizar su propiedad `completed: true`.
   * Hacer que el checkbox de `App.jsx` llame a esa ruta, para que cuando la tarea se tache, se guarde así en MongoDB para siempre.
