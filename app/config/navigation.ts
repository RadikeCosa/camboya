import {
  HomeIcon,
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
    id: "data-viz",
    href: "/data-viz",
    Icon: BarChartIcon,
    nav: {
      label: "Desafíos de Código",
      shortLabel: "Coding Data",
    },
    type: "tool",
    showInHeader: true,
    showInFooter: true,
    card: {
      title: "Desafíos de Programación",
      description:
        "Seguimiento de los problemas de programación que resuelvo diariamente. Visualiza mi progreso y estadísticas.",
      tags: [
        { label: "Timeline", colorType: "info" },
        { label: "Estadísticas", colorType: "success" },
        { label: "Progreso", colorType: "warning" },
      ],
      gradient: "primary",
      linkText: "Ver Desafíos",
    },
    quickLink: {
      label: "Ver Progreso",
      variant: "primary",
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
