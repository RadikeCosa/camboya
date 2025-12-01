// Tipos para los datos de navegación
export interface NavItem {
  href: string;
  label: string;
  icon: string; // SVG path
  shortLabel?: string; // Para Footer y otros lugares donde se necesita nombre corto
}

export interface ToolItem extends NavItem {
  description: string;
  tags: Array<{
    label: string;
    colorType: "success" | "warning" | "info";
  }>;
  gradient: "primary" | "accent";
  linkText: string;
}

export interface QuickLink {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}

// Iconos SVG como paths
export const icons = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  document:
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  documentChart:
    "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  barChart:
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  arrow: "M9 5l7 7-7 7",
};

// Links de navegación principales
export const mainNavItems: NavItem[] = [
  {
    href: "/",
    label: "Inicio",
    icon: icons.home,
  },
];

// Links de herramientas para navegación
export const toolNavItems: NavItem[] = [
  {
    href: "/ESAS",
    label: "ESAS Assessment",
    shortLabel: "ESAS",
    icon: icons.document,
  },
  {
    href: "/ESAS/results",
    label: "ESAS Resultados",
    icon: icons.documentChart,
  },
  {
    href: "/data-viz",
    label: "Data Visualization",
    shortLabel: "Conding Data",
    icon: icons.barChart,
  },
];

// Datos de las tarjetas de herramientas para la página principal
export const toolCards: ToolItem[] = [
  {
    href: "/ESAS",
    label: "ESAS Assessment Tool",
    shortLabel: "ESAS",
    icon: icons.document,
    description:
      "Escala de Evaluación de Síntomas de Edmonton. Registra y monitorea síntomas de pacientes de forma sistemática.",
    tags: [
      { label: "Evaluación", colorType: "success" },
      { label: "Monitoreo", colorType: "warning" },
      { label: "Médico", colorType: "info" },
    ],
    gradient: "primary",
    linkText: "Ir a ESAS",
  },
  {
    href: "/data-viz",
    label: "Coding Data Tool",
    shortLabel: "Coding Data Tool",
    icon: icons.barChart,
    description: "Visualizacion de Coding Challenges Data",
    tags: [
      { label: "Timeline", colorType: "info" },
      { label: "Estadísticas", colorType: "success" },
      { label: "Progreso", colorType: "warning" },
    ],
    gradient: "accent",
    linkText: "Ir a Coding Data",
  },
];

// Quick links para la sección de llamada a la acción
export const quickLinks: QuickLink[] = [
  {
    href: "/ESAS",
    label: "Nueva Evaluación",
    variant: "primary",
  },
  {
    href: "/ESAS/results",
    label: "Ver Resultados",
    variant: "secondary",
  },
];

// Links del footer (subset de toolNavItems)
export const footerLinks: NavItem[] = toolNavItems.filter(
  (item) => item.href === "/ESAS" || item.href === "/data-viz"
);
