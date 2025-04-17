import { useEffect, useRef, useState } from "react";
import { submitFile, getTaskStatus, TaskStatus } from "../mock/mockApi";

export const useFileUploadPolling = (
  onTaskCreated: (task: { id: string; status: TaskStatus }) => void,
  onStatusUpdate: (id: string, status: TaskStatus) => void
) => {
  const [latestTaskId, setLatestTaskId] = useState<string | null>(null);
  const retries = useRef(0);

  const uploadFile = async (file: File) => {
    const { task_id } = await submitFile();
    setLatestTaskId(task_id);
    onTaskCreated({ id: task_id, status: "processing" });
  };

  useEffect(() => {
    if (!latestTaskId) return;
    const interval = setInterval(async () => {
      try {
        const { status } = await getTaskStatus(latestTaskId);
        onStatusUpdate(latestTaskId, status);
        if (status !== "processing") clearInterval(interval);
        retries.current = 0;
      } catch {
        retries.current++;
        if (retries.current >= 3) {
          clearInterval(interval);
          onStatusUpdate(latestTaskId, "error");
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [latestTaskId]);

  return { uploadFile };
};
