
import { TaskType } from "../types";
import { RemoveTaskFunction } from "../types";
const Task: React.FC<{ task: TaskType; onRemove: RemoveTaskFunction }> = ({ task, onRemove }) => {
  return (
    <li className="border p-2 flex justify-between items-center mt-3">
      <span>{task.text}</span>
      <button onClick={onRemove} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
    </li>
  );
}
export default Task;