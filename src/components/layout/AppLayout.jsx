export default function AppLayout({ children, theme }) {
  return (
    <main
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "dark" ? "bg-[#090F20]" : "bg-gray-400"
      }`}
    >
      <section
        className={`relative w-full max-w-[330px] min-h-[620px] overflow-hidden rounded-2xl flex flex-col transition-colors duration-300 ${
          theme === "dark"
            ? "bg-[#151D35] text-white"
            : "bg-background text-black"
        }`}
      >
        {children}
      </section>
    </main>
  );
}
