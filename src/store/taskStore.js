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

      // 👉 helper (history + persist safe)
      setTasksWithHistory: (newTasks) => {
        const { tasks, past } = get();

        set({
          past: [...past, tasks],
          tasks: newTasks,
          future: [],
        });
      },

      // ➕ ADD
      addTask: (task) => {
        const { tasks, setTasksWithHistory } = get();
        setTasksWithHistory([...tasks, task]);
      },

      // ✏️ UPDATE
      updateTask: (id, updates) => {
        const { tasks, setTasksWithHistory } = get();

        const updated = tasks.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        );

        setTasksWithHistory(updated);
      },

      // 🗑 DELETE
      deleteTask: (id) => {
        const { tasks, setTasksWithHistory } = get();
        setTasksWithHistory(tasks.filter((t) => t.id !== id));
      },

      // 🔙 UNDO
      undo: () => {
        const { past, tasks, future } = get();

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
      },

      // 🔜 REDO
      redo: () => {
        const { future, tasks, past } = get();

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
      },

    }),

    {
      name: 'task-storage', // 🔥 key in localStorage
    }
  )
);