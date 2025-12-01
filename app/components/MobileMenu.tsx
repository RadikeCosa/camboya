"use client";
import Link from "next/link";
import { useMobileMenu } from "../hooks/useMobileMenu";
import NavLink from "./NavLink";
import { mainNavItems, toolNavItems } from "../config/navigation";

export default function MobileMenu() {
  const { open, setOpen, panelRef, handleOverlayClick } = useMobileMenu();

  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg border"
        aria-label="Abrir menú"
        style={{
          background: "var(--background-secondary)",
          color: "var(--foreground)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-md)",
        }}
        onClick={() => setOpen(true)}
      >
        <span
          className="block w-6 h-0.5 mb-1.5 rounded-full"
          style={{ background: "var(--foreground)" }}
        ></span>
        <span
          className="block w-6 h-0.5 mb-1.5 rounded-full"
          style={{ background: "var(--foreground)" }}
        ></span>
        <span
          className="block w-6 h-0.5 rounded-full"
          style={{ background: "var(--foreground)" }}
        ></span>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 flex"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={handleOverlayClick}
        >
          <div
            ref={panelRef}
            className="h-full flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out"
            style={{
              width: "var(--sidebar-width)",
              transform: open ? "translateX(0)" : "translateX(-100%)",
              background: "var(--background-secondary)",
              color: "var(--foreground)",
            }}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                const closeBtn = panelRef.current?.querySelector(
                  "button[aria-label='Cerrar menú']"
                ) as HTMLButtonElement;
                if (closeBtn) closeBtn.focus();
                e.preventDefault();
              }
            }}
          >
            {/* Header del panel */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center gap-2 text-lg font-bold"
                style={{
                  background: "var(--gradient-primary)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <span className="text-xl">🚀</span>
                My App
              </Link>
              <button
                aria-label="Cerrar menú"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={handleClose}
                autoFocus
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <p
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--foreground-muted)" }}
              >
                Navegación
              </p>

              {mainNavItems.map((item) => (
                <NavLink key={item.href} item={item} onClick={handleClose} />
              ))}

              <p
                className="px-3 py-2 mt-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--foreground-muted)" }}
              >
                Herramientas
              </p>

              {toolNavItems.map((item) => (
                <NavLink key={item.href} item={item} onClick={handleClose} />
              ))}
            </nav>

            {/* Footer del panel */}
            <div
              className="p-4 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div
                className="rounded-lg p-3"
                style={{
                  background: "var(--gradient-primary)",
                }}
              >
                <p className="text-white text-sm font-medium">¿Necesitas ayuda?</p>
                <p className="text-white/80 text-xs mt-1">
                  Explora las herramientas disponibles
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
