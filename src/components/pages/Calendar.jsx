import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toJalaali, toGregorian, jalaaliMonthLength } from "jalaali-js";

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export default function Calendar() {
  // تاریخ امروز
  const today = new Date();

  const todayJalali = toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  // سال، ماه و روز انتخاب‌شده
  const [year, setYear] = useState(todayJalali.jy);
  const [month, setMonth] = useState(todayJalali.jm);
  const [selectedDay, setSelectedDay] = useState(todayJalali.jd);

  // رفتن به ماه قبل
  const previousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }

    setSelectedDay(null);
  };

  // رفتن به ماه بعد
  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }

    setSelectedDay(null);
  };

  // تعداد روزهای ماه
  const daysCount = jalaaliMonthLength(year, month);

  // روز اول ماه
  const firstDay = toGregorian(year, month, 1);

  const firstDate = new Date(firstDay.gy, firstDay.gm - 1, firstDay.gd);

  const emptyDays = (firstDate.getDay() + 1) % 7;

  const isToday = (day) =>
    year === todayJalali.jy &&
    month === todayJalali.jm &&
    day === todayJalali.jd;

  // ساخت روزهای تقویم
  const days = [
    ...Array(emptyDays).fill(""),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];

  return (
    <div className="w-full flex-1 bg-input px-3 pt-4">
      {/* ماه و سال */}
      <div className="flex items-center justify-between mb-7">
        <button onClick={previousMonth}>
          <ChevronRight size={24} color="#14265D" />
        </button>

        <h2 className="font-bold text-blue">
          {months[month - 1]} {year}
        </h2>

        <button onClick={nextMonth}>
          <ChevronLeft size={24} color="#14265D" />
        </button>
      </div>

      {/* روزهای هفته */}
      <div className="grid grid-cols-7 mb-3">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-[10px] text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* روزهای ماه */}
      <div className="grid grid-cols-7 gap-y-7">
        {days.map((day, index) => (
          <div key={index} className="flex justify-center">
            {day !== "" && (
              <button
                onClick={() => setSelectedDay(day)}
                className={`w-[20px] h-[20px] rounded-[5px] text-[12px]
                  ${
                    isToday(day)
                      ? "bg-[#14265D] text-white"
                      : selectedDay === day
                      ? "bg-[#E8ECF8] text-[#14265D]"
                      : "text-gray-500"
                  }
                `}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
