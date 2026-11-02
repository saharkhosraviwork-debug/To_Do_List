export default function AppLayout({ children, theme }) {
  return (
    <main className="min-h-screen bg-gray-400 flex items-center justify-center">
      <section
        className={`relative w-full max-w-[330px] min-h-[620px] overflow-hidden rounded-2xl flex flex-col ${
          theme === "dark"
            ? "bg-[#151515] text-white"
            : "bg-background text-black"
        }`}
      >
        {children}
      </section>
    </main>
  );
}
