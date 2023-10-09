"use client";

import EditUserForm from "@/components/form/EditUserForm";

import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const EditUserPage = () => {
  const { data: user, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <div className="h-full flex justify-center items-center">
      <EditUserForm user={user} isLoading={userLoading} />
    </div>
  );
};

export default EditUserPage;
