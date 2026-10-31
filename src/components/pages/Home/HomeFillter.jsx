
export default function HomeFilter({ activeFilter, setActiveFilter }) {

    const filters = [
      { title: "شخصی", image: "/image/person.svg" },
      { title: "امروز", image: "/image/sun.svg" },
      { title: "کار", image: "/image/work.svg" },
      { title: "خرید", image: "/image/-shop.svg" },
    ];
  
    return (
      <div className="w-full mb-[12px]">
  
        <div className="flex items-center justify-between gap-2 ">
  
          {filters.map((filter) => {
            const isActive = activeFilter === filter.title;
  
            return (
              <button
                key={filter.title}
                onClick={() => setActiveFilter(filter.title)}
                className={`flex items-center justify-center gap-2 cursor-pointer text-black font-bold rounded-[4px] px-3 py-1 transition  ${
                  isActive ? "bg-gray-200" : "bg-transparent"
                }`}
              >
  
                <img
                  src={filter.image}
                  alt={filter.title}
                  className="w-5 h-5 object-contain"
                />
  
                <span className="text-[13px] font-medium whitespace-nowrap">
                  {filter.title}
                </span>
  
              </button>
            );
          })}
  
        </div>
      </div>
    );
  }
  