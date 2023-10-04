"use client";

import EditProductForm from "@/components/form/EditProductForm";

import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const EditProductPage = () => {
  const { data: products, isLoading: productLoading } = useSelector(
    (state: RootState) => state.product
  );

  return (
    <div className="h-full flex justify-center items-center">
      <EditProductForm products={products} isLoading={productLoading} />
    </div>
  );
};

export default EditProductPage;
