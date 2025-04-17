import { useState } from "react";
import FileUploader from "./components/FileUploader";
import TaskList from "./components/TaskList";
import { TaskStatus } from "./mock/mockApi";

export interface Task {
  id: string;
  status: TaskStatus;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">File Task Tracker</h1>
        <FileUploader onTaskCreated={addTask} onStatusUpdate={updateTaskStatus} />
        <TaskList tasks={tasks} onStatusUpdate={updateTaskStatus} />
      </div>
    </div>
  );
}

export default App;
