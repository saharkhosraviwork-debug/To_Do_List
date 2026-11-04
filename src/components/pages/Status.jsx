import { useState, useEffect } from "react";

export default function Status() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const remainingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="relative flex flex-col flex-1  w-full bg-white p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-7 text-[18px]">وضعیت تسک‌ها</h2>

      <div className="bg-input rounded-2xl p-5 mb-5">
        <h3 className="text-base font-semibold mb-4">پیشرفت کارها</h3>

        <p className="text-3xl font-bold text-blue mb-3">{progress}%</p>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          از {totalTasks} تسک، {completedTasks} تسک انجام شده است.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue/10 rounded-xl p-4">
          <p className="text-sm text-black">کل تسک‌ها</p>
          <p className="text-2xl font-bold text-blue mt-2">{totalTasks}</p>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-black">انجام‌شده</p>
          <p className="text-2xl font-bold text-green-800 mt-2">
            {completedTasks}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm text-black">باقی‌مانده</p>
          <p className="text-2xl font-bold text-red-800 mt-2">
            {remainingTasks}
          </p>
        </div>
      </div>

      {totalTasks === 0 && (
        <p className="text-center text-sm text-gray-400 mt-8">
          هنوز هیچ تسکی اضافه نکرده‌ای.
        </p>
      )}
    </div>
  );
}
