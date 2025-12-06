# Instrucciones para GitHub Copilot

Este documento contiene las instrucciones y convenciones específicas del proyecto para asegurar consistencia en el código generado.

## Configuración de Estilos

Este proyecto utiliza una combinación de **Tailwind CSS v4** y **CSS Variables** para los estilos.

### Variables CSS Globales

Los estilos base están definidos en `app/globals.css` con variables CSS personalizadas:

- **Colores de fondo**: `--background`, `--background-secondary`
- **Colores de texto**: `--foreground`, `--foreground-strong`, `--foreground-muted`
- **Colores de marca**: `--accent`, `--accent-light`, `--accent-dark`, `--accent-foreground`
- **Gradientes**: `--gradient-primary`, `--gradient-accent`
- **Colores de estado**: `--success`, `--warning`, `--error`, `--info` (con variantes `-light`)
- **Bordes**: `--border-color`, `--border-radius-sm/md/lg/xl`
- **Sombras**: `--shadow-sm/md/lg`
- **Espaciado**: `--spacing-xs/sm/md/lg/xl/2xl`
- **Tipografía**: `--font-main`, `--font-header`

### Uso de Estilos

1. **Clases de Tailwind**: Para layout, spacing y utilidades generales
2. **Variables CSS**: Para colores, sombras y valores de diseño consistentes mediante `style={{ color: "var(--foreground)" }}`
3. **Clases utilitarias**: `.card`, `.card-hover`, `.nav-link`, `.btn`, `.btn-primary`, `.btn-secondary` (definidas en `globals.css`)

### Ejemplo de uso

```tsx
<div 
  className="flex items-center gap-2 p-4 rounded-lg"
  style={{ 
    background: "var(--background-secondary)",
    color: "var(--foreground)",
    boxShadow: "var(--shadow-md)"
  }}
>
```

## Estructura de Carpetas para Nuevas Secciones

Cada nueva sección del proyecto debe organizarse dentro de su propia carpeta en `app/` con los archivos necesarios.

### Estructura requerida para una nueva sección

```
app/
└── [nombre-seccion]/
    ├── page.tsx              # Página principal de la sección
    ├── components/           # Componentes específicos de esta sección
    │   ├── index.ts          # Export barrel para los componentes
    │   ├── types.ts          # Tipos TypeScript de la sección
    │   └── [Componente].tsx  # Componentes de la sección
    └── data/                 # (Opcional) Datos estáticos de la sección
        └── [datos].json
```

### Ejemplo de estructura (sección `data-viz`)

```
app/
└── data-viz/
    ├── page.tsx
    ├── [problemName]/        # Ruta dinámica
    │   └── page.tsx
    ├── components/
    │   ├── index.ts
    │   ├── types.ts
    │   ├── ExerciseTimeline.tsx
    │   ├── ProblemCard.tsx
    │   └── ProblemDetail.tsx
    └── data/
        └── problems.data.json
```

### Registro de nuevas secciones

Al crear una nueva sección, agrégala en `app/config/navigation.ts` siguiendo el patrón `SectionConfig`.

## Convención de Iconos

**Los iconos NUNCA deben incluirse como SVG inline en los componentes JSX.**

### Cómo usar iconos correctamente

1. **Importar desde `app/icons`**:

```tsx
import { HomeIcon, ArrowIcon, BarChartIcon } from "../icons";
// o con ruta absoluta
import { HomeIcon } from "@/app/icons";
```

2. **Uso en componentes**:

```tsx
<HomeIcon className="w-5 h-5" />
<ArrowIcon className="w-4 h-4 rotate-180" />
```

### Crear un nuevo icono

Si necesitas un icono que no existe en `app/icons/`:

1. Crea un nuevo archivo en `app/icons/[NombreIcono].tsx`:

```tsx
import { IconProps } from "./types";

export default function NuevoIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {/* Paths del SVG */}
    </svg>
  );
}
```

2. Exporta el icono en `app/icons/index.ts`:

```tsx
export { default as NuevoIcon } from "./NuevoIcon";
```

### Iconos disponibles

Los iconos existentes están en `app/icons/`:
- `HomeIcon`, `DocumentIcon`, `DocumentChartIcon`, `BarChartIcon`
- `ArrowIcon`, `ArticleIcon`, `PlusIcon`, `CloseIcon`
- `ErrorIcon`, `SuccessIcon`, `EmptyDocumentIcon`, `TrashIcon`
- `SpinnerIcon`, `ErrorCircleIcon`, `SuccessCheckIcon`, `WarningIcon`
- `GitHubIcon`

## Tecnologías del Proyecto

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4 + CSS Variables
- **UI Components**: MUI (Material UI) v7
- **Validación**: Zod v4
