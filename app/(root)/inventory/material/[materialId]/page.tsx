"use client";

import EditMaterialForm from "@/components/form/EditMaterialForm";

import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const EditMaterialPage = () => {
  const { data: materials, isLoading: materialLoading } = useSelector(
    (state: RootState) => state.material
  );

  return (
    <div className="h-full flex justify-center items-center">
      <EditMaterialForm material={materials} isLoading={materialLoading} />
    </div>
  );
};

export default EditMaterialPage;
