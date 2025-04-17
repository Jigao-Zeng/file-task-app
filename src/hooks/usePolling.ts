import { useEffect, useRef } from "react";
import { getTaskStatus } from "../mock/mockApi";

const usePolling = (
  taskId: string,
  onStatusUpdate: (id: string, status: string) => void
) => {
  const retries = useRef(0);
  const cancelled = useRef(false);

  useEffect(() => {
    let interval = setInterval(async () => {
      if (cancelled.current) return;
      try {
        const { status } = await getTaskStatus(taskId);
        if (status !== "processing") {
          clearInterval(interval);
        }
        onStatusUpdate(taskId, status);
        retries.current = 0;
      } catch (err) {
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

export default usePolling;
