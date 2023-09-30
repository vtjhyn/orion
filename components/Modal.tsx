import { CategoryProps, addCategory } from "@/store/slice/categorySlice";
import { AppDispatch } from "@/store/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface ModalProps {
  onClose: () => void;
  title: string;
  id: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");

  const handleSave = () => {
    console.log(value)
    if(id === 'category') {
      dispatch(addCategory(value as Partial<CategoryProps>))
      .then((result: any) => {
        console.log("Category added:", result.payload);
        // Buat notif
        onClose();
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
    }

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
