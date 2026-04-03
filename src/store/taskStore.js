import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTasks } from '../data/mockTask';
import toast from 'react-hot-toast';

export const useTaskStore = create(
  persist(
    (set, get) => ({

      // 🔥 STATE
      tasks: mockTasks,
      past: [],
      future: [],
      history: [], // ✅ NEW

      // 🧠 ADD HISTORY HELPER
      addHistory: (entry) => {
        const { history } = get();
        set({
          history: [entry, ...history],
        });
      },

      // 👉 helper (history + persist safe)
      setTasksWithHistory: (newTasks, actionMessage = "Tasks updated") => {
        const { tasks, past, addHistory } = get();

        // ✅ save undo history
        set({
          past: [...past, tasks],
          tasks: newTasks,
          future: [],
        });

        // ✅ add activity log
        addHistory({
          id: Date.now(),
          message: actionMessage,
          timestamp: new Date().toISOString(),
        });
      },

      // ➕ ADD
      addTask: (task) => {
        const { tasks, setTasksWithHistory } = get();

        setTasksWithHistory(
          [...tasks, task],
          `🟢 Task "${task.title}" created`
        );
      },

      // ✏️ UPDATE
      updateTask: (id, updates) => {
        const { tasks, setTasksWithHistory } = get();

        const task = tasks.find(t => t.id === id);

        const updated = tasks.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        );

        let message = ` Task "${task?.title}" updated`;

        // 🔥 detect status change (drag)
        if (updates.status && updates.status !== task?.status) {
          message = `🔁 Task "${task?.title}" moved to ${updates.status}`;
        }

        setTasksWithHistory(updated, message);
      },

      // 🗑 DELETE
      deleteTask: (id) => {
        const { tasks, setTasksWithHistory } = get();

        const task = tasks.find(t => t.id === id);

        setTasksWithHistory(
          tasks.filter((t) => t.id !== id),
          `❌ Task "${task?.title}" deleted`
        );
      },

      // 🔙 UNDO
      undo: () => {
        const { past, tasks, future, addHistory } = get();

        if (past.length === 0) {
          toast("Nothing to undo ⚠️");
          return;
        }

        const previous = past[past.length - 1];

        set({
          tasks: previous,
          past: past.slice(0, -1),
          future: [tasks, ...future],
        });

        addHistory({
          id: Date.now(),
          message: "↩️ Undo action performed",
          timestamp: new Date().toISOString(),
        });
      },

      // 🔜 REDO
      redo: () => {
        const { future, tasks, past, addHistory } = get();

        if (future.length === 0) {
          toast("Nothing to redo ⚠️");
          return;
        }

        const next = future[0];

        set({
          tasks: next,
          future: future.slice(1),
          past: [...past, tasks],
        });

        addHistory({
          id: Date.now(),
          message: "↪️ Redo action performed",
          timestamp: new Date().toISOString(),
        });
      },

    }),

    {
      name: 'task-storage', // 🔥 localStorage key
    }
  )
);