import { useTaskStore } from "../store/taskStore";

const HistoryPanel = () => {
  const history = useTaskStore((state) => state.history);

  return (
    <div className="w-[300px] bg-white shadow rounded p-4 overflow-y-auto h-[650px]">
      <h2 className="font-semibold mb-3">Activity</h2>

      <div className="flex flex-col gap-2">
        {history.map((item) => (
          <div key={item.id} className="text-sm text-gray-600 border-b pb-2">
            <p>{item.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(item.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;