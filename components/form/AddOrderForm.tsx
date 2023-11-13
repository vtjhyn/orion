"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import Loader from "../Loader";

const AddOrderForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedProductPrice, setSelectedProductPrice] = useState<
    number | null
  >(null);
  const { data: products, isLoading: productLoading } = useSelector(
    (state: RootState) => state.product
  );
  const ref = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getProduct());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      quantity: 1,
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // data.price = parseInt(data.price);
    // data.quantity = parseInt(data.quantity);
    // dispatch(addProduct(data))
    //   .then((result) => {
    //     console.log("Product added:", result.payload);
    //     // Buat notif
    //   })
    //   .catch((error) => {
    //     console.error("Error adding product:", error);
    //   });
  };

  return (
    <div className="">
      {productLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] flex flex-col gap-8"
          id="orderitemform"
        >
          <div className="w-full flex justify-between items-center gap-4">
            <p className="font-semibold w-[40%]">Product Name</p>
            <div className="w-full flex items-center gap-2">
            </div>
          </div>
          <Input
            id="quantity"
            label="Quantity"
            disabled={false}
            register={register}
            errors={errors}
            validationSchema={{
              required: "nominal wajib diisi",
              pattern: {
                value: /^\d+$/,
                message: "gunakan format angka",
              },
            }}
            onChange={(e) => {
              const inputQuantity = parseInt(e.target.value);
              setQuantity(inputQuantity);
            }}
          />
          <div className="flex justify-between font-semibold" >
            <p>Price</p>
            <div>
              {selectedProductPrice
                ? `Rp${(selectedProductPrice * quantity).toLocaleString("id-ID")}`
                : "Select a product"}
            </div>
          </div>
          <Button
            label="Save"
            onClick={() => {}}
            disabled={productLoading ? true : false}
          />
        </form>
      )}
    </div>
  );
};

export default AddOrderForm;
