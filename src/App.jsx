import { useState } from 'react';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import { Toaster } from 'react-hot-toast';
import { useTaskStore } from './store/taskStore';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null); // ✅ FIX

  const undo = useTaskStore((s) => s.undo);
const redo = useTaskStore((s) => s.redo);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Toast */}
      <Toaster
        position="top-center"
        
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            padding: '10px',
          },
        }}
      />

      {/* Header */}
      
    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
  <h1 className="text-2xl font-semibold text-gray-800">
    Task Board
  </h1>

  <div className="flex gap-3">
    <button
      onClick={undo}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      Undo
    </button>

    <button
      onClick={redo}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      Redo
    </button>

    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:scale-95 transition"
    >
      + Add Task
    </button>
  </div>
</div>

      {/* Content */}
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <Board setEditTask={setEditTask} /> {/* ✅ pass edit handler */}
        </div>
      </div>

      {/* Modal */}
      {(editTask || showModal) && (
        <TaskModal
          editData={editTask}
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;