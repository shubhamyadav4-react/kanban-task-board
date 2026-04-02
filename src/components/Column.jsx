import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({setEditTask, id, title, tasks }) => {
    const { setNodeRef } = useDroppable({ id });

    const Row = ({ index, style }) => {
        const task = tasks[index];

        return (
            <div style={style}>
                <TaskCard task={task} />
            </div>
        );
    };

    return (
        <div
            ref={setNodeRef}
            className="flex-none w-[370px] h-[500px] bg-white rounded-lg shadow p-4 border border-dashed border-gray-300 overflow-y-auto"
        >
            <h2 className="text-lg font-semibold mb-3">{title}</h2>

            <div className="flex flex-col gap-3">
                {tasks.map(task => (
                    <TaskCard onEdit={setEditTask} key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Column;