export default function HomeFilter({ activeFilter, setActiveFilter }) {
    const filters = [
      { title: "همه", image: "/image/layout-grid.svg" },
      { title: "شخصی", image: "/image/person.svg" },
      // { title: "امروز", image: "/image/sun.svg" },
      { title: "کار", image: "/image/work.svg" },
      { title: "خرید", image: "/image/-shop.svg" },
    ];
  
    return (
      <div className="w-full mb-[12px]">
        <div className="flex items-center justify-between gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.title;
  
            return (
              <button
                key={filter.title}
                onClick={() => setActiveFilter(filter.title)}
                className={`flex items-center justify-center gap-2 cursor-pointer font-semibold rounded-[4px] px-3 py-1 transition ${
                  isActive
                    ? "bg-gray-200 text-blue"
                    : "bg-transparent text-black"
                }`}
              >
                <img
                  src={filter.image}
                  alt={filter.title}
                  className={`w-5 h-5 object-contain ${
                    isActive ? "opacity-100" : "opacity-100"
                  }`}
                />
  
                <span className="text-[12px] font-medium whitespace-nowrap">
                  {filter.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }