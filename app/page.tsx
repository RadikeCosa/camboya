import Link from "next/link";
import ToolCard from "./components/ToolCard";
import { toolCards, quickLinks } from "./config/navigation";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            background: "var(--gradient-primary)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Bienvenido a My App
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--foreground-muted)" }}
        >
          Una plataforma integral para evaluaciones médicas ESAS y visualización
          de datos de programación. Selecciona una herramienta para comenzar.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {toolCards.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </section>

      {/* Quick Links Section */}
      <section
        className="card p-6"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              ¿Listo para comenzar?
            </h3>
            <p className="text-white/80">
              Accede rápidamente a las funcionalidades principales.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link) =>
              link.variant === "primary" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 rounded-lg bg-white font-semibold transition-transform hover:scale-105"
                  style={{ color: "var(--accent)" }}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 rounded-lg bg-white/20 text-white font-semibold border border-white/30 transition-transform hover:scale-105"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
