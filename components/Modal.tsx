import axios from "axios";
import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  id: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave, title, id }) => {
  const [value, setValue] = useState("");

  const handleSave = () => {
    axios
      .post(`/api/${id}`, { name: value })
      .then((response) => {
        onSave(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };

  return (
    <div className="bg-white w-1/3 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add {title}</h2>
      <input
        type="text"
        className="w-full border p-2 rounded-md"
        placeholder={`${title} Name`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-color3 font-semibold rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
