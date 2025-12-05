import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import MobileMenu from "./components/MobileMenu";

export const metadata: Metadata = {
  title: "Mi Progreso en Programación",
  description: "Seguimiento de desafíos de programación diarios y proyectos de desarrollo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen min-w-screen">
        {/* 
          Layout principal usando CSS Grid.
          - En desktop (md:): sidebar fijo a la izquierda, header arriba, main al centro, footer abajo.
          - En mobile: sidebar y header ocultos, menú hamburguesa visible, main y footer ocupan todo el ancho.
        */}
        <div
          className="grid grid-cols-1 grid-rows-[4rem_1fr_4rem] md:grid-cols-[16rem_1fr] md:grid-rows-[4rem_1fr_4rem] h-screen w-screen"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          {/* Header solo en desktop */}
          <div className="hidden md:block row-start-1 row-end-2 col-span-1 md:col-span-2">
            <Header />
          </div>
          {/* Menú hamburguesa y panel lateral unificados en mobile */}
          <div className="md:hidden absolute top-4 left-4 z-50">
            <MobileMenu />
          </div>
          {/* Sidebar solo en desktop */}
          <div className="hidden md:block row-start-2 row-end-3 col-start-1 col-end-2 h-full">
            <Sidebar />
          </div>
          {/* Main siempre visible */}
          <div className="row-start-2 row-end-3 col-start-1 md:col-start-2 col-end-2 md:col-end-3 flex items-center justify-center">
            <Main>{children}</Main>
          </div>
          {/* Footer siempre visible */}
          <div className="row-start-3 row-end-4 col-span-1 md:col-span-2">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
