# Backend Project

Este es el backend para un sistema de gestión de contenido, categorías, temas y usuarios, utilizando Node.js, TypeORM, Typedi, y Routing-Controllers.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- npm o yarn
- MongoDB

## Instalación

Sigue estos pasos para configurar el entorno de desarrollo:

1. **Instalar las dependencias**

   Utilizando npm:

   ```bash
   npm install
   ```

   O utilizando yarn:

   ```bash
   yarn install
   ```

2. **Inicializar la base de datos**

   Asegúrate de que MongoDB está corriendo y de que has configurado correctamente las variables de entorno relacionadas con la base de datos.

## Ejecución

Para ejecutar el servidor en desarrollo, utiliza el siguiente comando:

```bash
npm run start
```

## Pruebas Unitarias

Se hizo unit testing a el controlador de login con casos de exito y fallo:
ruta /user/**test**/user.controller.test.ts

```bash
npm run test
```

## Estructura de Archivos

La estructura del proyecto está organizada de la siguiente manera:

- src/: Directorio de código fuente.
  - entity/: Entidades de TypeORM.
  - controller/: Controladores que manejan las peticiones.
  - service/: Servicios que contienen la lógica de negocio.
  - repository/: Repositorios para interactuar con la base de datos.
  - middleware/: Middleware personalizado para Routing-Controllers.
- config/: Configuraciones del proyecto, incluidas las configuraciones de TypeORM.
- utils/: Utilidades y funciones auxiliares.


# Documentacion API

## Roles

### Crear Rol

- **Endpoint**: `POST /role`
- **Payload**:
  ```json
  {
    "name": "admin",
    "permissions": ["create", "read", "update", "delete"]
  }
  ```

### Listar Roles

- **Endpoint**: `GET /role`
- **Payload**:
  ```json
  [
    {
      "name": "admin",
      "permissions": ["create", "read", "update", "delete"]
    }
  ]
  ```

## Usuarios

### Crear Usuario

- **Endpoint**: `POST /user`
- **Payload**:
  ```json
  {
    "alias": "johndoe",
    "email": "johndoe@example.com",
    "roles": ["roleId1", "roleId2"]
  }
  ```

### Actualizar Usuario

- **Endpoint**: `PUT /user/id`
- **Payload**:
  ```json
  {
    "alias": "johndoe",
    "email": "johndoe@example.com",
    "roles": ["roleId1", "roleId2"]
  }
  ```

### Listar Usuarios

- **Endpoint**: `GET /user`
- **Payload**:
  ```json
  [
    {
      "alias": "johndoe",
      "email": "johndoe@example.com",
      "roles": ["roleId1", "roleId2"]
    }
  ]
  ```

### Login Usuario

- **Endpoint**: `POST /user/login`
- **Payload**:
  ```json
  {
    "email": "johndoe@example.com",
  }
  ```

## Categorías

### Crear Categoría

- **Endpoint**: `GET /category`
- **Payload**:
  ```json
  {
    "name": "Educación",
    "description": "Categoría dedicada a temas educativos"
  }
  ```

### Actualizar Categoría

- **Endpoint**: `PUT /category/:id`
- **Payload**:
  ```json
  {
    "name": "Educación",
    "description": "Categoría dedicada a temas educativos"
  }
  ```

### Obtener Categorías

- **Endpoint**: `GET /category`
- **Payload**:
  ```json
  [
    {
      "name": "Educación",
      "description": "Categoría dedicada a temas educativos"
    }
  ]
  ```

## Temas

### Crear Tema

- **Endpoint**: `GET /theme`
- **Payload**:
  ```json
  {
    "name": "Tecnología"
  }
  ```

### Actualizar Tema

- **Endpoint**: `PUT /theme/:id`
- **Payload**:
  ```json
  {
    "name": "Tecnología"
  }
  ```

### Obtener Temas

- **Endpoint**: `GET /theme`
- **Payload**:
  ```json
  [
    {
      "name": "Tecnología"
    }
  ]
  ```

## Contenidos

### Crear Contenido

- **Endpoint**: `GET /content`
- **Payload**:
  ```json
  {
    "name": "Artículo de Tecnología",
    "themeId": "idDelTema",
    "categoryId": "idDeLaCategoría",
    "userId": "idDelUsuario"
  }
  ```

### Actualizar Contenido

- **Endpoint**: `PUT /content/:id`
- **Payload**:
  ```json
  {
    "name": "Artículo de Tecnología",
    "themeId": "idDelTema",
    "categoryId": "idDeLaCategoría",
    "userId": "idDelUsuario"
  }
  ```

### Obtener Contenidos

- **Endpoint**: `GET /content`
- **Payload**:
  ```json
  [
    {
      "name": "Artículo de Tecnología",
      "themeId": "idDelTema",
      "categoryId": "idDeLaCategoría",
      "userId": "idDelUsuario"
    }
  ]
  ```
