import { CategoryProps, addCategory, deleteCategory, editCategory } from "@/store/slice/categorySlice";
import { UnitProps, addUnit, deleteUnit, editUnit } from "@/store/slice/unitsSlice";
import { AppDispatch } from "@/store/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";

interface ModalProps {
  onClose: () => void;
  title: string;
  id: string;
  data: CategoryProps[] | UnitProps[] | undefined;

}

const Modal: React.FC<ModalProps> = ({ onClose, title, id, data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setMode] = useState("");
  const [value, setValue] = useState({
    name: '',
    imgUrl: 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand-thumbnail.png'
  });
  const [editItem, setEditItem] =useState<UnitProps | CategoryProps>();



  const onSave = () => {
    if (id === "category") {
      dispatch(addCategory(value))
        .then((result: any) => {
          console.log("Category added:", result.payload);
          // Buat notif
          onClose();
        })
        .catch((error) => {
          console.error("Error saving category:", error);
        });
    }
    if (id === "unit") {
      dispatch(addUnit(value))
        .then((result: any) => {
          console.log("Unit added:", result.payload);
          // Buat notif
          onClose();
        })
        .catch((error) => {
          console.error("Error saving unit:", error);
        });
    }
  };

  const handleEdit = (data: UnitProps | CategoryProps) => {
    setMode("Edit")
    setValue({...value,name: data.name});
    setEditItem(data)
  };

  const onEdit = (data: any) => {
    if (id === "unit") {
      dispatch(editUnit({ id: data.id, name: value.name }))
        .then((result: any) => {
          console.log("Unit editted:", result.payload);
          // Buat notif
          onClose();
        })
        .catch((error) => {
          console.error("Error saving unit:", error);
        });
    }
    if (id === "category") {
      dispatch(editCategory({ id: data.id, name: value.name }))
        .then((result: any) => {
          console.log("Category editted:", result.payload);
          // Buat notif
          onClose();
        })
        .catch((error) => {
          console.error("Error saving category:", error);
        });
    }
  }

  const onDelete= (data: any) => {
    if (id === "unit") {
      dispatch(deleteUnit(data))
        .then((result: any) => {
          console.log("Unit Deleted:", result.payload);
          // Buat notif
          onClose();
        })
        .catch((error) => {
          console.error("Error delete unit:", error);
        });
    }
    if (id === "category") {
      dispatch(deleteCategory(data))
        .then((result: any) => {
          console.log("Category Deleted:", result.payload);
          // Buat notif
          onClose();
        })
        .catch((error) => {
          console.error("Error delete category:", error);
        });
    }
  }
  

  return (
    <div className="bg-white w-1/3 p-4 rounded-lg">
      <div className="flex justify-center mb-4">
        <table className="w-full table-auto border-collapse border-2 border-slate-500">
          <thead>
            <tr>
              <th className="border-2 border-slate-500">NO</th>
              <th className="border-2 border-slate-500">Name</th>
              <th className="border-2 border-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => (
              <tr key={index}>
                <td className="border border-slate-500 text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-500 p-1">{data.name}</td>
                <td className="border border-slate-500 text-center">
                  <span
                    className="hover:cursor-pointer hover:bg-color3/30"
                    onClick={() => handleEdit(data)}
                  >
                    EDIT
                  </span>
                  <span className="font-bold"> | </span>
                  <span 
                    className="hover:cursor-pointer hover:bg-color3/30"
                    onClick={() => onDelete(data)}
                  >
                    DELETE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-evenly">
        <h2 className="text-sm font-semibold">{title}</h2>
        <input
          type="text"
          className="w-[70%] border p-2 rounded-md"
          placeholder={value.name}
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-center mt-4">
        <Button
          label="Save"
          onClick={mode === 'Edit' ? (() => onEdit(editItem)) : onSave}
        />

      </div>
    </div>
  );
};

export default Modal;
