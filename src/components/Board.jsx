import { useEffect, useState } from 'react';

import { useTaskStore } from '../store/taskStore';

import { DndContext, DragOverlay } from '@dnd-kit/core';

import Column from './Column';
import FilterBar from './FilterBar';
import { updateTaskApi } from '../utils/fakeApi';
import TaskCard from './TaskCard';
import toast from 'react-hot-toast';



const Board = ({ setEditTask }) => {

    const tasks = useTaskStore((state) => state.tasks);

    const updateTask = useTaskStore((state) => state.updateTask);


    const [filters, setFilters] = useState({

        assignee: '',

        priority: '',

        search: ''

    });

    const [activeTask, setActiveTask] = useState(null);



    const handleDragStart = (event) => {
        const task = tasks.find(t => t.id === event.active.id);
        setActiveTask(task);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id;

        const task = tasks.find(t => t.id === taskId);
        const oldStatus = task.status;

        updateTask(taskId, { status: newStatus });

        try {
            await updateTaskApi(taskId, { status: newStatus });
        } catch {
            updateTask(taskId, { status: oldStatus });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            simulateExternalUpdate();
        }, 9000); // every 9 sec

        return () => clearInterval(interval);
    }, [tasks]);

    const getPriorityStyle = (priority) => {
    switch (priority) {
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

    const simulateExternalUpdate = () => {
        if (tasks.length === 0) return;

        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];

        const statuses = ['todo', 'in-progress', 'done'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

        if (randomTask.status === newStatus) return;

        updateTask(randomTask.id, { status: newStatus });
      toast(
  <div className="max-w-[320px]">
    <p className={`text-center ${getPriorityStyle(randomTask.priority)}`}>
      {randomTask.priority.toUpperCase()}
    </p>
    <p className="text-sm text-gray-600 line-clamp-3">
      "{randomTask.title}" updated by {randomTask.assignee}
    </p>
  </div>
);
        // toast.success(<div>{`${randomTask.priority} level Task "${randomTask.title}" updated by ${randomTask.assignee}`}</div>)

    };


    // 🔥 FILTER LOGIC

    const filteredTasks = tasks.filter((task) => {

        const matchAssignee =

            !filters.assignee || task.assignee.toLowerCase().includes(filters.assignee.toLowerCase());


        const matchPriority =

            !filters.priority || task.priority === filters.priority;



        const matchSearch =

            !filters.search ||

            task.title.toLowerCase().includes(filters.search.toLowerCase()) ||

            task.description.toLowerCase().includes(filters.search.toLowerCase());



        return matchAssignee && matchPriority && matchSearch;

    });



    const getTasks = (status) =>

        filteredTasks.filter((t) => t.status === status);



    return (

        <>

            <FilterBar filters={filters} setFilters={setFilters} />



            {/* <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

                <div style={{ display: 'flex', gap: '20px' }}>

                    <Column id="todo" title="Todo" tasks={getTasks('todo')} />

                    <Column id="in-progress" title="In Progress" tasks={getTasks('in-progress')} />

                    <Column id="done" title="Done" tasks={getTasks('done')} />

                </div>

            </DndContext> */}
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' >

                    <Column setEditTask={setEditTask} id="todo" title="Todo" tasks={getTasks('todo')} />

                    <Column setEditTask={setEditTask} id="in-progress" title="In Progress" tasks={getTasks('in-progress')} />

                    <Column setEditTask={setEditTask} id="done" title="Done" tasks={getTasks('done')} />

                </div>

                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </>

    );

};



export default Board;