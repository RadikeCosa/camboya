export default function Main({ children }: { children?: React.ReactNode }) {
  return (
    <main
      className="flex h-full w-full overflow-auto"
      style={{
        background: "var(--background)",
      }}
    >
      <div className="w-full h-full p-6">
        {children}
      </div>
    </main>
  );
}
