import  { useEffect, useState } from 'react';
import Task from './components/task';
import { TaskType } from './types';
import logo from './assets/logo.svg';
import { addTask, removeTask, getAllTasks } from './indexDB'
const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    getAllTasks().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const handleAddTask = (taskText :string) => {
    addTask(taskText).then(() => {
      getAllTasks().then((tasks) => {
        setTasks(tasks);
      });
    });
  };

  const handleRemoveTask = (taskId :number) => {
    removeTask(taskId).then(() => {
      getAllTasks().then((tasks) => {
        setTasks(tasks);
      });
    });
  };

  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskInput = event.currentTarget.taskInput.value;
    if (taskInput.trim() !== '') {
      handleAddTask(taskInput);
      event.currentTarget.taskInput.value = '';
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col justify-center items-center h-screen">
      <img src={logo} alt=""  className='w-8 h-8' />
      <h1>Lista de Tareas</h1>
      <form onSubmit={submitTask}>
        <input type="text" name="taskInput" placeholder="Agregar tarea" className="border p-2 mt-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Agregar</button>
      </form>
      <ul className="mt-4 w-80 max-w-full">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onRemove={() => handleRemoveTask(task.id)} />
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;