
# N5 Challenge Frontend

Este proyecto es una aplicación web hecha con **React**, **TypeScript** y **Vite** para gestionar permisos de empleados. Utiliza TailwindCSS para los estilos y React Router para la navegación.

## Arquitectura

- **src/pages/**: Vistas principales (listar, crear y editar permisos)
- **src/components/**: Componentes reutilizables (ej: `PermissionForm`)
- **src/api/**: Lógica para consumir la API (ej: `permissions.ts`)
- **src/hooks/**: Hooks personalizados para manejar datos y lógica de negocio
- **src/types/**: Tipos TypeScript para las entidades principales

El flujo principal es:
1. Listar permisos (`PermissionsList`)
2. Crear permiso (`CreatePermissionPage`)
3. Editar permiso (`EditPermissionPage`)

## ¿Cómo levantar el proyecto?

1. Instala las dependencias:
  ```bash
  npm install
  ```
2. Inicia el servidor de desarrollo:
  ```bash
  npm run dev
  ```
3. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.
