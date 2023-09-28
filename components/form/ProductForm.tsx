"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../Modal";

interface ProductFormProps {
  units: any;
  categories: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ units, categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [categoryList, setCategoryList] = useState(categories);
  const [unitList, setUnitList] = useState(units);

  const addCategoryToList = (newCategory: any) => {
    setCategoryList((prevCategories: any) => [...prevCategories, newCategory]);
  };

  const addUnitToList = (newUnit: any) => {
    setUnitList((prevUnits: any) => [...prevUnits, newUnit]);
  };

  useEffect(() => {
    setCategoryList(categories);
    setUnitList(units);
  }, [categories, units]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (data: any) => {
    data.price = parseInt(data.price)
    data.quantity = parseInt(data.quantity)
    console.log(data);
  };

  const handleCategorySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === "AddCategory") {
      setShowModal(true);
      setModalType("Category");
      e.target.value = "";
    }
  };

  const handleUnitSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "AddUnit") {
      setShowModal(true);
      setModalType("Unit");
      e.target.value = "";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
      
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] flex flex-col gap-8"
        id="productform"
      >
        <Input
          id="name"
          label="Product Name"
          disabled={false}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={false}
          register={register}
          errors={errors}
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={false}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="quantity"
          label="Quantity"
          type="number"
          disabled={false}
          register={register}
          errors={errors}
        />
        <div className="w-full flex justify-between items-center gap-4">
          <p className="font-semibold">Unit</p>
          <select
            {...register("unit")}
            className="border h-full w-[40%] p-2 text-center"
            onChange={handleUnitSelectChange}
            required
          >
            <option value="">
              Select
            </option>
            {unitList.map((unit: any) => (
              <option key={unit.id} value={unit.name}>
                {unit.name}
              </option>
            ))}
            <option value="AddUnit">Add Unit</option>
          </select>
        </div>
        <div className="w-full flex justify-between items-center gap-4">
          <p className="font-semibold w-[40%]">Category</p>
          <select
            {...register("category")}
            className="border h-full w-[40%] p-2 text-center"
            onChange={handleCategorySelectChange}
            required
          >
            <option value="">
              Select
            </option>
            {categoryList.map((category: any) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value="AddCategory">Add Category</option>
          </select>
        </div>
        <Button label="Save" onClick={() => {}} />
      </form>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={handleBackgroundClick}
        >
          <Modal
            title={modalType}
            onClose={closeModal}
            onSave={
              modalType === "Category" ? addCategoryToList : addUnitToList
            }
            id={modalType.toLowerCase()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductForm;
