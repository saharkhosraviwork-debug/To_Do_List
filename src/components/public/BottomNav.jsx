import { NavLink } from "react-router-dom";
import { House, ChartNoAxesColumnIncreasing, Calendar , Link  } from "lucide-react";

export default function BottomNav() {
  const menuItems = [
    {
      title: "خانه",
      path: "/home",
      icon: House,
    },
    {
      title: "وضعیت",
      path: "/status",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      title: "تقویم",
      path: "/calendar",
      icon: Calendar ,
    },
    {
      title: "ارسال",
      path: "/share",
      icon: Link ,
    },
  ];

  return (
    <nav className="mt-auto w-full shrink-0 bg-input">
      <div className="flex h-[65px] w-full items-center justify-around px-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 ${
                  isActive ? "text-blue" : "text-icon"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-1 h-1 rounded-full ${
                        isActive ? "bg-blue" : "bg-transparent"
                      }`}
                    />

                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <span className="text-[10px] font-semibold">{item.title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
