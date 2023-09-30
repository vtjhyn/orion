"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import { getUnit } from "@/store/slice/unitsSlice";
import { getCategory } from "@/store/slice/categorySlice";
import { SettingOutlined } from "@ant-design/icons";

const ProductForm = () => {
  const { data: units, isLoading: unitLoading } = useSelector(
    (state: RootState) => state.unit
  );
  const { data: categories, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );
  const ref = useRef(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getUnit());
      dispatch(getCategory());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (data: any) => {
    data.price = parseInt(data.price);
    data.quantity = parseInt(data.quantity);
    dispatch(addProduct(data))
      .then((result) => {
        console.log("Product added:", result.payload);
        // Buat notif
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
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
      {unitLoading || categoryLoading ? (
        <p>Loading...</p>
      ) : (
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
            <div className="w-[50%] flex items-center gap-2">
              <select
                {...register("unitId")}
                className="border h-full w-full p-2 text-center"
                onChange={handleUnitSelectChange}
                required
              >
                <option value="">Select</option>
                {units?.map((unit: any) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
                <option value="AddUnit">Add Unit</option>
              </select>
              <div>
                <SettingOutlined className="hover:cursor-pointer hover:scale-110" />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-4">
            <p className="font-semibold w-[40%]">Category</p>
            <div className="w-[50%] flex items-center gap-2">
              <select
                {...register("categoryId")}
                className="border h-full w-full p-2 text-center"
                onChange={handleCategorySelectChange}
                required
              >
                <option value="">Select</option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value="AddCategory">Add Category</option>
              </select>
              <SettingOutlined className="hover:cursor-pointer hover:scale-110" />
            </div>
          </div>
          <Button
            label="Save"
            onClick={() => {}}
            disabled={isLoading ? true : false}
          />
        </form>
      )}

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={handleBackgroundClick}
        >
          <Modal
            title={modalType}
            onClose={closeModal}
            id={modalType.toLowerCase()}
            data={units}
          />
        </div>
      )}
    </div>
  );
};

export default ProductForm;
