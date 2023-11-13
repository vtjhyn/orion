"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProductProps,
  deleteProduct,
  getProduct,
  getProductById,
} from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { UserProps, deleteUser, getUser, getUserById } from "@/store/slice/userSlice";
import Loader from "@/components/Loader";

const UserSettingPage = () => {
  const router = useRouter();
  const ref = useRef(false);
  const { data, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getUser());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const onDelete = (data: any) => {
    dispatch(deleteUser(data))
      .then((result: any) => {
        console.log("Product Deleted:", result.payload);
        // Buat notif
      })
      .catch((error: any) => {
        console.error("Error delete product:", error);
      });
  };

  const onEdit = (data: any) => {
    dispatch(getUserById(data.id)).then((result: any) => {
      router.push(`/setting/user/${result.payload.id}`);
      console.log(data)
    });
  };

  console.log(data);

  return (
    <div className="h-full flex-col justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-[180px] ">
            <Button
              label="Add User"
              onClick={() => router.push("/setting/user/adduser")}
            />
          </div>
          {data?.map((data: UserProps) => (
            <div className="outline my-4" key={data.id}>
              <div>Nama : {data.name}</div>
              <div>Email : {data.email}</div>
              <div>Role : {data.role.name}</div>
              <Button label="Edit" onClick={() => onEdit(data)} />
              <Button label="Delete" onClick={() => onDelete(data)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSettingPage;
