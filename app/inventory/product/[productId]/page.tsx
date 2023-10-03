'use client'

import EditProductForm from "@/components/form/EditProductForm";
import { getProduct, getProductById } from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const EditProductPage = ({ params }: { params: { productId: any } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.product);
  useEffect(() => {
      dispatch(getProductById(params.productId));
  }, []);
  console.log(data)
  return (
    <div className="h-full flex justify-center items-center">
      <EditProductForm 
        productData={data}
      />
    </div>
  );
};

export default EditProductPage;
