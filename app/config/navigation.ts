import {
  HomeIcon,
  DocumentIcon,
  DocumentChartIcon,
  BarChartIcon,
  type IconComponent,
} from "../icons";

// ============================================================================
// TIPOS
// ============================================================================

export type TagColorType = "success" | "warning" | "info";
export type GradientType = "primary" | "accent";
export type QuickLinkVariant = "primary" | "secondary";

export interface Tag {
  label: string;
  colorType: TagColorType;
}

export interface QuickLinkConfig {
  label: string;
  variant: QuickLinkVariant;
}

/**
 * Configuración completa de una sección del sitio.
 * Esta es la única fuente de verdad - todos los demás exports se derivan de aquí.
 */
export interface SectionConfig {
  // Identificador único de la sección
  id: string;

  // URL de la sección
  href: string;

  // Componente de icono React
  Icon: IconComponent;

  // Configuración de navegación
  nav: {
    label: string; // Etiqueta para sidebar y menú móvil
    shortLabel?: string; // Etiqueta corta para header y footer
  };

  // Si es una sección principal (se muestra en "Navegación") o herramienta (se muestra en "Herramientas")
  type: "main" | "tool";

  // Configuración para mostrar en header (si no está definido, no se muestra)
  showInHeader?: boolean;

  // Configuración para mostrar en footer (si no está definido, no se muestra)
  showInFooter?: boolean;

  // Configuración de tarjeta para página principal (si no está definido, no tiene tarjeta)
  card?: {
    title: string;
    description: string;
    tags: Tag[];
    gradient: GradientType;
    linkText: string;
  };

  // Configuración de quick link (si no está definido, no tiene quick link)
  quickLink?: QuickLinkConfig;
}

// ============================================================================
// FUENTE DE VERDAD ÚNICA - Agregar nuevas secciones aquí
// ============================================================================

export const sections: SectionConfig[] = [
  {
    id: "home",
    href: "/",
    Icon: HomeIcon,
    nav: {
      label: "Inicio",
    },
    type: "main",
    showInHeader: true,
  },
  {
    id: "esas",
    href: "/ESAS",
    Icon: DocumentIcon,
    nav: {
      label: "ESAS Assessment",
      shortLabel: "ESAS",
    },
    type: "tool",
    showInHeader: true,
    showInFooter: true,
    card: {
      title: "ESAS Assessment Tool",
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
    quickLink: {
      label: "Nueva Evaluación",
      variant: "primary",
    },
  },
  {
    id: "esas-results",
    href: "/ESAS/results",
    Icon: DocumentChartIcon,
    nav: {
      label: "ESAS Resultados",
    },
    type: "tool",
    quickLink: {
      label: "Ver Resultados",
      variant: "secondary",
    },
  },
  {
    id: "data-viz",
    href: "/data-viz",
    Icon: BarChartIcon,
    nav: {
      label: "Data Visualization",
      shortLabel: "Coding Data",
    },
    type: "tool",
    showInHeader: true,
    showInFooter: true,
    card: {
      title: "Coding Data Tool",
      description: "Visualizacion de Coding Challenges Data",
      tags: [
        { label: "Timeline", colorType: "info" },
        { label: "Estadísticas", colorType: "success" },
        { label: "Progreso", colorType: "warning" },
      ],
      gradient: "accent",
      linkText: "Ir a Coding Data",
    },
  },
];

// ============================================================================
// EXPORTS DERIVADOS - Los componentes usan estos
// ============================================================================

/** Secciones principales (tipo "main") para sidebar/mobile menu */
export const mainSections = sections.filter((s) => s.type === "main");

/** Secciones de herramientas (tipo "tool") para sidebar/mobile menu */
export const toolSections = sections.filter((s) => s.type === "tool");

/** Secciones para mostrar en el header */
export const headerSections = sections.filter((s) => s.showInHeader);

/** Secciones para mostrar en el footer */
export const footerSections = sections.filter((s) => s.showInFooter);

/** Secciones que tienen tarjeta en la página principal */
export const cardSections = sections.filter((s) => s.card !== undefined);

/** Secciones que tienen quick link */
export const quickLinkSections = sections.filter(
  (s) => s.quickLink !== undefined
);

// ============================================================================
// TIPOS LEGACY (para compatibilidad con componentes existentes)
// ============================================================================

/** @deprecated Use SectionConfig instead */
export interface NavItem {
  href: string;
  label: string;
  Icon: IconComponent;
  shortLabel?: string;
}

/** @deprecated Use SectionConfig instead */
export interface ToolItem extends NavItem {
  description: string;
  tags: Tag[];
  gradient: GradientType;
  linkText: string;
}

/** @deprecated Use SectionConfig instead */
export interface QuickLink {
  href: string;
  label: string;
  variant: QuickLinkVariant;
}

// ============================================================================
// EXPORTS LEGACY (para compatibilidad con componentes existentes)
// ============================================================================

/** @deprecated Use mainSections instead */
export const mainNavItems: NavItem[] = mainSections.map((s) => ({
  href: s.href,
  label: s.nav.label,
  Icon: s.Icon,
  shortLabel: s.nav.shortLabel,
}));

/** @deprecated Use toolSections instead */
export const toolNavItems: NavItem[] = toolSections.map((s) => ({
  href: s.href,
  label: s.nav.label,
  Icon: s.Icon,
  shortLabel: s.nav.shortLabel,
}));

/** @deprecated Use cardSections instead */
export const toolCards: ToolItem[] = cardSections.map((s) => ({
  href: s.href,
  label: s.card!.title,
  Icon: s.Icon,
  shortLabel: s.nav.shortLabel,
  description: s.card!.description,
  tags: s.card!.tags,
  gradient: s.card!.gradient,
  linkText: s.card!.linkText,
}));

/** @deprecated Use quickLinkSections instead */
export const quickLinks: QuickLink[] = quickLinkSections.map((s) => ({
  href: s.href,
  label: s.quickLink!.label,
  variant: s.quickLink!.variant,
}));

/** @deprecated Use footerSections instead */
export const footerLinks: NavItem[] = footerSections.map((s) => ({
  href: s.href,
  label: s.nav.label,
  Icon: s.Icon,
  shortLabel: s.nav.shortLabel,
}));
