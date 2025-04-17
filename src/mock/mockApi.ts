export type TaskStatus = 'pending' | 'processing' | 'success' | 'error' | 'cancelled';

interface Task {
  id: string;
  status: TaskStatus;
  startTime: number;
  duration: number;
  fail?: boolean;
}

const tasks = new Map<string, Task>();

export function submitFile(): Promise<{ task_id: string }> {
  const id = crypto.randomUUID();
  const duration = Math.random() * 5000 + 5000;
  const fail = Math.random() < 0.2;

  tasks.set(id, {
    id,
    status: 'processing',
    startTime: Date.now(),
    duration,
    fail,
  });

  return new Promise(resolve => {
    setTimeout(() => resolve({ task_id: id }), 500);
  });
}

export function getTaskStatus(id: string): Promise<{ status: TaskStatus }> {
  return new Promise((resolve, reject) => {
    const task = tasks.get(id);
    if (!task) return reject(new Error('Task not found'));

    const elapsed = Date.now() - task.startTime;

    if (task.status === 'cancelled') {
      return resolve({ status: 'cancelled' });
    }

    if (elapsed >= task.duration) {
      task.status = task.fail ? 'error' : 'success';
    }

    resolve({ status: task.status });
  });
}

export function cancelTask(id: string) {
  const task = tasks.get(id);
  if (task && task.status === 'processing') {
    task.status = 'cancelled';
  }
}
