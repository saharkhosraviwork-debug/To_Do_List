
import { Pencil, Trash2, Check } from "lucide-react";

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className="w-full bg-white rounded-2xl p-4 mb-2 shadow-sm flex items-center justify-between">

      <div className="flex items-center gap-3 min-w-0">

        {/* مربع  تسک */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
            task.completed
              ? "bg-blue-500"
              : "bg-gray-200"
          }`}
          aria-label={task.completed ? "علامت‌گذاری به‌عنوان انجام‌نشده" : "علامت‌گذاری به‌عنوان انجام‌شده"}
        >
          {task.completed && (
            <Check size={14} color="white" strokeWidth={3} />
          )}
        </button>

        {/* عنوان تسک */}
        <h3
          className={`text-[14px] font-bold break-words transition-all  ${
            task.completed
              ? "text-gray-400 line-through"
              : "text-black"
          }`}
        >
          {task.title}
        </h3>

      </div>

      {/* دکمه‌های ویرایش و حذف */}
      <div className="flex items-center gap-3 shrink-0 mr-2">

        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          title="ویرایش"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
          title="حذف"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}
