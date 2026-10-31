export default function AppLayout({ children }) {
    return (
      <main className="min-h-screen bg-gray-400 flex items-center justify-center">
  
        <section className="relative w-full max-w-[330px] min-h-[620px] bg-background overflow-hidden rounded-2xl flex flex-col">
  
          {children}
  
        </section>
  
      </main>
    );
  }