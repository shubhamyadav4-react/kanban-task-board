import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ setEditTask, id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  // 🔥 Stats
  const total = tasks.length;
  const high = tasks.filter(t => t.priority === 'high').length;

  // 🎨 Column color
  const getBorderColor = () => {
    if (id === 'todo') return 'border-yellow-300';
    if (id === 'in-progress') return 'border-blue-300';
    if (id === 'done') return 'border-green-300';
    return 'border-gray-300';
  };
const getProgress = () => {
  if (id === 'todo') return 20;
  if (id === 'in-progress') return 60;
  if (id === 'done') return 100;
  return 0;
};
  return (
    <div
      ref={setNodeRef}
      className={`flex-none w-[370px] h-[600px] bg-white rounded-xl shadow-sm p-4 border border-dashed ${getBorderColor()} overflow-y-auto overflow-x-hidden`}
    >
      {/* 🔥 HEADER */}
      <div className="mb-4">
        
        {/* Title + Count */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>

          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
            {total}
          </span>
        </div>

        {/* Extra info */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>🔥 High: {high}</span>
        </div>

        {/* 🔥 Progress Bar (optional but cool) */}
        <div className="w-full bg-gray-200 h-0.5 rounded mt-2">
          <div
            className="bg-blue-500 h-0.5 rounded"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {/* TASK LIST */}
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-10">
            No tasks here 👀
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              onEdit={setEditTask}
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;