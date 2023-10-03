"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductProps, deleteProduct, getProduct } from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const ProductPage = () => {
  const router = useRouter();
  const ref = useRef(false);
  const { data, isLoading } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getProduct());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const onDelete = (data: any) => {
    dispatch(deleteProduct(data))
      .then((result: any) => {
        console.log("Product Deleted:", result.payload);
        // Buat notif
      })
      .catch((error) => {
        console.error("Error delete product:", error);
      });
  };

  const onEdit = (data: any) => {
    console.log(data)
    // router.push(`/inventory/product/${data.id}`)
  };

  return (
    <div className="h-full flex-col justify-center items-center">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div>
          <div className="w-[180px] ">
            <Button
              label="Add Product"
              onClick={() => router.push("/inventory/product/addproduct")}
            />
          </div>
          {data?.map((data: ProductProps) => (
            <div className="outline my-4" key={data.id}>
              <div>Nama : {data.name}</div>
              <div>Deskripsi : {data.description}</div>
              <div>Harga : {data.price}</div>
              <div>
                Jumlah : {data.quantity} <span>{data.unit?.name}</span>
              </div>
              <div>Kategori : {data.category?.name}</div>
              <Button label="Edit" onClick={() => onEdit(data)} />
              <Button label="Delete" onClick={() => onDelete(data)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
