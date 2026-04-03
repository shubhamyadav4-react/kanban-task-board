import { useDraggable } from '@dnd-kit/core';
import { useTaskStore } from '../store/taskStore';
import { useEffect, useRef, useState } from 'react';
const TaskCard = ({ task, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [showMenu, setShowMenu] = useState(false);
const menuRef = useRef(null);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


  const getPriorityStyle = () => {
    switch (task.priority) {
      case 'low':
        return 'bg-yellow-100 text-yellow-700';
      case 'medium':
        return 'bg-violet-100 text-violet-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-2">
        
        {/* Drag handle (small area only) */}
        <span
          {...listeners}
          className="cursor-grab text-gray-400 text-sm p-5 hover:bg-gray-100"
        >
          ⋮⋮ drag
        </span>

        {/* 3 DOT MENU */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(prev => !prev)
            }}
            className="text-gray-500 hover:text-black p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-10">
              
              <button
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onEdit(task); // ✅ OPEN EDIT
                }}
              >
                ✏️ Edit
              </button>

              <button
                className="block w-full text-left px-3 py-2 hover:bg-red-100 text-sm text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-center font-semibold text-gray-800 mb-2">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 truncate w-40 mb-8">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 truncate w-40">👤 {task.assignee}</span>

        <span className={`px-2 py-1 rounded-full ${getPriorityStyle()}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;