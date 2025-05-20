# 📍 maps-frontend-react

Aplicación web desarrollada con **React**, **TypeScript** y **Vite** que muestra un mapa interactivo utilizando **Mapbox GL JS**. La app solicita la ubicación del usuario y centra el mapa en ella, proporcionando una experiencia personalizada basada en la geolocalización.

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🖼️ Vista previa

Puedes ver la aplicación desplegada en:  
👉 [https://maps-frontend-react.vercel.app](https://maps-frontend-react.vercel.app)

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/eduardo355/maps-frontend-react.git
cd maps-frontend-react
```

### 2. Instalar dependencias

```bash
pnpm install
```

> También puedes usar `npm install` o `yarn`, según tu gestor de paquetes.

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_MAPBOX_TOKEN=tu_token_de_mapbox
```

> Reemplaza `tu_token_de_mapbox` con tu token personal que puedes obtener desde: [https://account.mapbox.com/](https://account.mapbox.com/)

### 4. Iniciar el servidor de desarrollo

```bash
pnpm run dev
```

Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 🧭 Funcionalidades principales

- ✅ Obtención de la ubicación actual del usuario usando la API de geolocalización del navegador.
- ✅ Mapa centrado en la ubicación del usuario usando Mapbox GL JS.
- ✅ Botón flotante para volver a la ubicación actual.
- ✅ Interfaz responsiva con Tailwind CSS.
- ✅ Configuración por variables de entorno para el token de Mapbox.

## 🛠 Recomendaciones para desarrollo

Puedes usar estas configuraciones en tu `settings.json` de VS Code para ordenar automáticamente tu código:

```json
"editor.codeActionsOnSave": {
  "source.organizeImports": true,
  "source.fixAll": true
}
```

También puedes instalar extensiones como:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

---

Desarrollado con 💻 por [Eduardo](https://github.com/eduardo355)
```
