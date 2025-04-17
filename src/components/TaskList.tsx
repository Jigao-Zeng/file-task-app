import React from "react";
import { cancelTask, TaskStatus } from "../mock/mockApi";
import { Task } from "../App";


interface Props {
  tasks: Task[];
  onStatusUpdate: (id: string, status: TaskStatus) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onStatusUpdate }) => {
  const handleCancel = (id: string) => {
    cancelTask(id);
    onStatusUpdate(id, "cancelled");
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Submitted Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span className="task-id">{task.id}</span>
            <span
              className={`task-status ${
                task.status === "success"
                  ? "status-success"
                  : task.status === "error"
                  ? "status-error"
                  : task.status === "cancelled"
                  ? "status-cancelled"
                  : "status-processing"
              }`}
            >
              {task.status}
            </span>
            {task.status === "processing" && (
              <button
                onClick={() => handleCancel(task.id)}
                className="cancel-button"
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
