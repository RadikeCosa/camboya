import { useState, useEffect, useRef } from "react";

/**
 * Custom hook para manejar el estado del menú mobile.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Cierra el menú con Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Cierra el menú al hacer click fuera del panel
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return {
    open,
    setOpen,
    panelRef,
    handleOverlayClick,
    // animationState, setAnimationState // para animaciones futuras
  };
}
