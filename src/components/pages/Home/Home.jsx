import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Settings, Search, Bell, Plus, X, ChevronDown } from "lucide-react";

import HomeFilter from "./HomeFillter.jsx";
import TaskList from "./TaskList.jsx";
import AddButton from "../../public/FloatingButton.jsx";

export default function Home({ showModal, setShowModal }) {
  const location = useLocation();
  const fullname = location.state?.fullname || "کاربر";

  const [activeFilter, setActiveFilter] = useState("شخصی");

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState(null);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [profileImage, setProfileImage] = useState(
    "/public/image/profile_shape.svg"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // انیمیشن برای  باز شدن مودال
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 10);

      return () => clearTimeout(timer);
    }

    setIsModalOpen(false);
  }, [showModal]);

  // باز کردن فرم و افزودن تسک جدید
  const openAddModal = () => {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskCategory("");
    setShowCategories(false);
    setShowModal(true);
  };

  // افزودن یا ویرایش تسک
  const addTask = () => {
    if (taskTitle.trim() === "" || taskCategory === "") {
      return;
    }

    if (editingTaskId !== null) {
      // ویرایش تسک قبلی
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: taskTitle.trim(),
                category: taskCategory,
              }
            : task
        )
      );
    } else {
      // ساخت تسک جدید
      const newTask = {
        id: Date.now(),
        title: taskTitle.trim(),
        category: taskCategory,
        completed: false,
      };

      setTasks((previousTasks) => [...previousTasks, newTask]);
    }

    closeModal();
  };

  // باز کردن فرم ویرایش
  const editTask = (task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskCategory(task.category);
    setShowCategories(false);
    setShowModal(true);
  };

  // حذف تسک
  const deleteTask = (id) => {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
  };

  // تیک زدنو  برداشتن تیک تسک
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // بستن مودال
  const closeModal = () => {
    setShowModal(false);
    setShowCategories(false);
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskCategory("");
  };

  // نمایش تسک‌های دسته‌بندی انتخاب‌شده
  const filteredTasks = tasks.filter((task) => task.category === activeFilter);

  return (
    <div className="w-full flex flex-col flex-1 min-h-0 relative">
      {/* هدر صفحه */}
      <div className="h-[200px] w-full bg-input flex items-center justify-between flex-col px-2 relative shrink-0">
        <button className="absolute top-[12px] left-5 text-icon cursor-pointer">
          <Settings size={22} />
        </button>

        <div className="absolute top-[12px] right-5 flex items-center gap-5">
          <button className="text-icon cursor-pointer">
            <Search size={22} />
          </button>

          <button className="text-icon cursor-pointer">
            <Bell size={22} />
          </button>
        </div>

        {/* پروفایل کاربر */}
        <div className="flex flex-col items-center m-auto mt-[40px]">
          <div className="relative">
            <div className="w-[75px] h-[75px] rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="تصویر پروفایل"
                className="w-full h-full object-cover"
              />
            </div>

            {/* ورودی انتخاب عکس */}
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* دکمه انتخاب عکس */}
            <label
              htmlFor="profile-upload"
              className="absolute bottom-1 right-0 w-5 h-5 rounded-full bg-blue text-white flex items-center justify-center border-2 border-white cursor-pointer"
            >
              <Plus size={12} strokeWidth={4} />
            </label>
          </div>

          <h2 className="mt-1.5 text-[15px] text-black font-bold">
            {fullname}
          </h2>
        </div>

        {/* فیلتر دسته‌بندی‌ها */}
        <HomeFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      {/* لیست تسک‌ها */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <TaskList
          tasks={filteredTasks}
          onEdit={editTask}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      </div>

      {/* دکمه افزودن تسک */}
      <AddButton icon={Plus} onClick={openAddModal} />

      {/* مودال افزودن و ویرایش */}
      {showModal && (
        <div
          className="absolute inset-0 z-50 bg-black/40 flex items-end"
          onClick={closeModal}
        >
          <div
            className={`bg-white w-full rounded-t-3xl p-5 pb-18 transform transition-transform duration-300 ease-out ${
              isModalOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/*  مودال */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[16px]">
                {editingTaskId !== null ? "ویرایش تسک" : "افزودن تسک جدید"}
              </h3>

              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            {/* ورودی  تسک */}
            <input
              type="text"
              placeholder="تسک را وارد کنید"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full border border-gray-300 bg-input rounded-[18px] p-2.5 mb-4 outline-none text-sm placeholder:text-gray-400"
            />

            {/* انتخاب دسته‌بندی */}
            <div className="relative">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full border border-gray-300 bg-input rounded-[18px] p-2.5 text-right flex items-center justify-between text-sm"
              >
                <span className={taskCategory ? "text-black" : "text-gray-400"}>
                  {taskCategory || "انتخاب دسته‌بندی"}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 ${
                    showCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/*  دسته‌بندی */}
              {showCategories && (
                <div className="absolute mt-1.5 left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {["شخصی", "امروز", "کار", "خرید"].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setTaskCategory(category);
                        setShowCategories(false);
                      }}
                      className="w-full text-right p-1.5 text-[12px] hover:bg-gray-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* دکمه افزودن */}
            <button
              onClick={addTask}
              className="w-full bg-blue text-white rounded-[18px] p-2.5 mt-5 cursor-pointer"
            >
              {editingTaskId !== null ? "ذخیره تغییرات" : "افزودن"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
