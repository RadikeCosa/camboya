"use client";
import { useMobileMenu } from "../hooks/useMobileMenu";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MobileMenu() {
  const { open, setOpen, panelRef, handleOverlayClick } = useMobileMenu();

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded border"
        aria-label="Abrir menú"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          borderColor: "var(--foreground)",
        }}
        onClick={() => setOpen(true)}
      >
        <span
          className="block w-6 h-0.5 mb-1"
          style={{ background: "var(--foreground)" }}
        ></span>
        <span
          className="block w-6 h-0.5 mb-1"
          style={{ background: "var(--foreground)" }}
        ></span>
        <span
          className="block w-6 h-0.5"
          style={{ background: "var(--foreground)" }}
        ></span>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 flex"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={handleOverlayClick}
        >
          <div
            ref={panelRef}
            className="h-full w-64 flex flex-col shadow-md transform transition-transform duration-300 ease-in-out"
            style={{
              transform: open ? "translateX(0)" : "translateX(-100%)",
              background: "var(--background)",
              color: "var(--foreground)",
              borderRight: "1px solid var(--foreground)",
            }}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                // Focus trap simple: si el único botón es el de cerrar, lo mantiene
                const closeBtn = panelRef.current?.querySelector(
                  "button[aria-label='Cerrar menú']"
                ) as HTMLButtonElement;
                if (closeBtn) closeBtn.focus();
                e.preventDefault();
              }
            }}
          >
            <button
              aria-label="Cerrar menú"
              className="self-end m-2 p-2 rounded border"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--foreground)",
              }}
              onClick={() => setOpen(false)}
              autoFocus
            ></button>
            <Header />
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
