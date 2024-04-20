import  { useState } from 'react';
import Task from './components/task';
import { TaskType } from './types';


const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const addTask = (taskText: string) => {
    setTasks([...tasks, { id: Date.now(), text: taskText }]);
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  
  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskInput = event.currentTarget.taskInput as HTMLInputElement;
    addTask(taskInput.value);
    taskInput.value = '';
  }


  return (
    <div className="container mx-auto">
      <h1>Lista de Tareas</h1>
      <form onSubmit={submitTask}>
        <input type="text" name="taskInput" placeholder="Agregar tarea" className="border p-2 mt-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar</button>
      </form>
      <ul className="mt-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onRemove={() => removeTask(task.id)} />
        ))}
      </ul>
    </div>
  );
};

export default App;