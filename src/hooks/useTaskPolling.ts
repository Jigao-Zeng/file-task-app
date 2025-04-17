import { useEffect, useRef } from "react";
import { getTaskStatus, TaskStatus } from "../mock/mockApi";

export const useTaskPolling = (
  taskId: string,
  onStatusUpdate: (id: string, status: TaskStatus) => void
) => {
  const retries = useRef(0);
  const cancelled = useRef(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (cancelled.current) return;
      try {
        const { status } = await getTaskStatus(taskId);
        if (status !== "processing") {
          clearInterval(interval);
        }
        onStatusUpdate(taskId, status);
        retries.current = 0;
      } catch {
        retries.current++;
        if (retries.current > 3) {
          clearInterval(interval);
          onStatusUpdate(taskId, "error");
        }
      }
    }, 2000);

    return () => {
      cancelled.current = true;
      clearInterval(interval);
    };
  }, [taskId, onStatusUpdate]);
};
