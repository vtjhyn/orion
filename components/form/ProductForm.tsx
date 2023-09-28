"use client";

import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";

interface ProductFormProps {
  units: any;
  categories: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ units, categories }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
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
          <p className="font-semibold w-[40%]">Unit</p>
          <select
            {...register("unit")}
            className="border h-full w-[25%] p-2 text-center"
            onChange={(e) => {
              if (e.target.value === "AddUnit") {
                // tambah unit
              }
            }}
            required
          >
            <option value="">
              Select
            </option>
            {units.map((unit: any) => (
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
            onChange={(e) => {
              if (e.target.value === "AddCategory") {
                // tambah kategory
              }
            }}
            required
          >
            <option value="">
              Select
            </option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value="AddCategory">Add Category</option>
          </select>
        </div>
        <Button label="Save" onClick={() => {}} />
      </form>
    </div>
  );
};

export default ProductForm;
