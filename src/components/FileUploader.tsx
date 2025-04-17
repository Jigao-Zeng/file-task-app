import React, { useState } from "react";
import { useFileUploadPolling } from "../hooks/useFileUploadPolling";
import { TaskStatus } from "../mock/mockApi";
import "../../src/styles.css";

interface Props {
  onTaskCreated: (task: { id: string; status: TaskStatus }) => void;
  onStatusUpdate: (id: string, status: TaskStatus) => void;
}

const FileUploader: React.FC<Props> = ({ onTaskCreated, onStatusUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const { uploadFile } = useFileUploadPolling(onTaskCreated, onStatusUpdate);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType =
      file.type === "application/pdf" || file.type.startsWith("image/");
    const isValidSize = file.size < 2 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setError("File must be a PDF or image under 2MB");
      return;
    }

    await uploadFile(file);
  };

  return (
    <div className="file-uploader-container">
      <label className="file-uploader-label">
        Upload a PDF or Image (Max 2MB):
      </label>
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={handleChange}
        className="file-uploader-input"
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUploader;
