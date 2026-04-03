import { useState } from 'react';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import { Toaster } from 'react-hot-toast';
import { useTaskStore } from './store/taskStore';
import Button from './components/Button/Button';
import HistoryPanel from './components/HistoryPanel';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null); // ✅ FIX
  const [showHistory, setShowHistory] = useState(false);

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
            maxWidth: '480px',   //  increase width
            padding: '14px 18px', //  more spacing
            fontSize: '14px',     // better readability
            borderRadius: '10px',
            // borderRadius: '8px',
            //       padding: '10px',

          }
        }}
      />

      {/* Header */}

      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">
          Task Board
        </h1>

        <div className="flex gap-3">

          <Button variant='secondary' onClick={() => setShowHistory(true)}>
            History
          </Button>
          <Button
            onClick={undo}
            variant='secondary'
          >
            Undo
          </Button>

          <Button
            onClick={redo}
            variant='secondary'
          >
            Redo
          </Button>

          <Button
            onClick={() => setShowModal(true)}
            variant='primary'>
            + Add Task
          </Button>
        </div>
      </div>

      {/* Content */}

      <div className="p-6 flex justify-center">

        {/* Board */}
        <div className="w-full max-w-6xl">
          <Board setEditTask={setEditTask} />
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="fixed left-0 top-0 h-full w-[320px] bg-white shadow-lg z-50 p-4">
            <Button className='mb-2' variant={"secondary"} onClick={() => setShowHistory(false)}>Close</Button>
            <HistoryPanel />
          </div>
        )}
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