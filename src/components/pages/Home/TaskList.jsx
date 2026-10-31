import TaskItem from "./TaskItems";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  return (
    <div className="w-full p-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400 text-sm mt-10">
          هنوز تسکی در این دسته‌بندی اضافه نکردی
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
}
