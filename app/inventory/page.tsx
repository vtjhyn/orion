'use client'

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";

const InventoryPage =  () => {
  const ref = useRef(false);
  const { data,isLoading } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(ref.current === false) {
      dispatch(getProduct());
    }
    return () => {
      ref.current = true;
    }
  }, [])

  return (
    <div>
      {isLoading ? (<h1>Loading...</h1>) : (
        data.map((data: any) => (
          <div className="outline my-4" key={data.id}>
            <div>Nama : {data.name}</div>
            <div>Deskripsi : {data.description}</div>
            <div>Harga : {data.price}</div>
            <div>Jumlah : {data.quantity} <span>{data.unit.name}</span></div>
            {/* <div>Kategori : {data.category.name}</div> */}
            </div>
        ))
      )}
      
    </div>
  );
};

export default InventoryPage;
