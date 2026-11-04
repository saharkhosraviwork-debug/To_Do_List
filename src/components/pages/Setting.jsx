import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Music, Smile, Thermometer } from "lucide-react";

export default function Settings({ theme, setTheme }) {
  const navigate = useNavigate();

  const [showThemes, setShowThemes] = useState(false);

  return (
    <div className="relative flex-1 w-full overflow-hidden bg-[#10245B] text-white px-7 pt-5">
      
      <div>
        <div className="absolute -top-5 -left-8 w-20 h-20 rounded-full border-2 border-white/10" />
        <div className="absolute -top-2 -right-9 w-18 h-18 rounded-full border-2 border-white blur-xs" />
        <div className="absolute top-40 -right-8 w-14 h-14 rounded-full border-4 border-white/5" />
        <div className="absolute top-8 -left-10 w-16 h-16 rounded-full border-2 border-white" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full border-3 border-white blur-md" />
      </div>

      
      <button
        onClick={() => navigate(-1)}
        className="text-white absolute left-[18px]"
        aria-label="بازگشت"
      >
        <ArrowLeft size={23} />
      </button>

      
      <div className="relative flex flex-col gap-9 mt-24 text-[22px] pr-4">
        <h2 className="text-lg font-bold">*تنظیمات</h2>

        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setShowThemes(!showThemes)}
            className="flex items-center gap-3 text-right"
          >
            <Thermometer size={24} strokeWidth={1.8} />
            <span className="font-medium">تغییر تم</span>
          </button>

          {showThemes && (
            <div className="flex items-center gap-8 pr-10 text-base">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                  className="accent-white"
                />
                light
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={() => setTheme("dark")}
                  className="accent-white"
                />
                dark
              </label>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <FileText size={24} strokeWidth={1.8} />
          <span className="font-medium">یادآوری</span>
        </div>

        <div className="flex items-center gap-4">
          <Music size={24} strokeWidth={1.8} />
          <span className="font-medium">صدا و موسیقی</span>
        </div>

        <div className="flex items-center gap-4">
          <Smile size={24} strokeWidth={1.8} />
          <span className="font-medium">درباره ما</span>
        </div>
      </div>
    </div>
  );
}
