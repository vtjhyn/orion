"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getRole } from "@/store/slice/roleSlice";
import { UserProps, editUser } from "@/store/slice/userSlice";
import ChangePasswordModal from "../ChangePasswordModal";

const EditUserForm = ({
  user,
  isLoading,
}: {
  user: UserProps[];
  isLoading: Boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { data: roles, isLoading: roleLoading } = useSelector(
    (state: RootState) => state.role
  );

  const ref = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getRole());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const onSubmit = (data: any) => {
    data.id = user[0].id;
    dispatch(editUser(data))
      .then((result) => {
        console.log("User edited:", result.payload);
        // Buat notif
      })
      .catch((error) => {
        console.error("Error user product:", error);
      });
  };

  const handleChangePassword = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user[0]?.name,
      email: user[0]?.email,
      roleId: user[0]?.roleId,
    },
  });

  return (
    <div className="">
      {roleLoading || isLoading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] flex flex-col gap-8"
          id="productform"
        >
          <Input
            id="name"
            label="Name"
            disabled={false}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="email"
            label="Email"
            disabled={false}
            register={register}
            errors={errors}
          />
          <div className="w-full flex justify-between items-center gap-4">
            <p className="font-semibold">Role</p>
            <div className="w-[50%] flex items-center gap-2">
              <select
                {...register("roleId")}
                className="border h-full w-full p-2 text-center"
                required
              >
                <option value="">Select</option>
                {roles?.map((role: any) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              label="Save"
              onClick={() => {}}
              disabled={isLoading ? true : false}
            />
            <Button
              label="Change Password"
              onClick={handleChangePassword}
              disabled={isLoading ? true : false}
              type="button"
            />
          </div>
        </form>
      )}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={handleBackgroundClick}
        >
          <ChangePasswordModal onClose={closeModal} user={user} />
        </div>
      )}
    </div>
  );
};

export default EditUserForm;
