"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const InventoryPage = () => {
  const router = useRouter();
  const ref = useRef(false);
  const { data, isLoading } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  console.log(data);

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getProduct());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  return (
    <div className="h-full flex-col justify-center items-center">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">Loading...</div>
      ) : (
        <div>
          <div className="w-[180px] ">
            <Button
              label="Add Product"
              onClick={() => router.push("/inventory/addproduct")}
            />
          </div>
          {data?.map((data: any) => (
            <div className="outline my-4" key={data.id}>
              <div>Nama : {data.name}</div>
              <div>Deskripsi : {data.description}</div>
              <div>Harga : {data.price}</div>
              <div>
                Jumlah : {data.quantity} <span>{data.unit.name}</span>
              </div>
              <div>Kategori : {data.category.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
