
import { NavLink } from "react-router-dom";
import {
  House,
  ChartNoAxesColumn,
  CalendarDays,
  Share2,
} from "lucide-react";

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
      icon: ChartNoAxesColumn,
    },
    {
      title: "تقویم",
      path: "/calendar",
      icon: CalendarDays,
    },
    {
      title: "اشتراک‌ گذاری",
      path: "/share",
      icon: Share2,
    },
  ];

  return (
    <nav className="mt-auto w-full shrink-0  bg-input">
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
              <Icon size={22} strokeWidth={2} />

              <span className="text-[10px] font-bold">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
