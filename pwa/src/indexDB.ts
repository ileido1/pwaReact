import { openDB } from 'idb';

const DB_NAME = 'todo-app';
const STORE_NAME = 'tasks';

export const openDatabase = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    },
  });
};

export const addTask = async (taskText : string) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  console.log(taskText)
  await store.add({ text: taskText });
  await tx.done;
};

export const removeTask = async (taskId : number) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete(taskId);
  await tx.done;
};

export const getAllTasks = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return await store.getAll();
};
