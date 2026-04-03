import { useTaskStore } from '../store/taskStore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ✅ Validation Schema
const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  assignee: z.string().min(1, 'Assignee is required'),
  priority: z.string().min(1, 'Priority is required'),
});

const TaskModal = ( {onClose, editData  }) => {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: editData || {},
  });

 const updateTask = useTaskStore((state) => state.updateTask);

const onSubmit = (data) => {
  if (editData) {
    updateTask(editData.id, data); // ✅ UPDATE
  } else {
    addTask({
      id: Date.now().toString(),
      ...data,
      status: 'todo',
      createdAt: new Date().toISOString(),
    });
  }

  onClose();
};

  return (
    <div   onClick={onClose} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-xl shadow-xl w-[350px] space-y-4">
        
        <h2 className="text-lg font-semibold text-gray-800">
          {editData ? 'Edit Task' : 'Create Task'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Title */}
          <div>
            <input
              {...register('title')}
              placeholder="Title"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register('description')}
              placeholder="Description"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Assignee */}
          <div>
            <input
              {...register('assignee')}
              placeholder="Assignee"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.assignee
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.assignee && (
              <p className="text-red-500 text-xs mt-1">
                {errors.assignee.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <select
              {...register('priority')}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.priority
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {errors.priority && (
              <p className="text-red-500 text-xs mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition active:scale-95"
          >
            Create
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;