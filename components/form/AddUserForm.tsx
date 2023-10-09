"use client";

import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { getRole } from "@/store/slice/roleSlice";
import { useEffect, useRef } from "react";
import { addUser } from "@/store/slice/userSlice";

const AddUserForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: roles, isLoading: roleLoading } = useSelector(
    (state: RootState) => state.role
  );


  const ref = useRef(false);

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getRole());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(addUser(data))
    .then((result) => {
      console.log("Product added:", result.payload);
      // Buat notif
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {roleLoading ? (
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
              validationSchema={{
                required: "Nama wajib diisi",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "nama depan tidak sesuai format",
                },
              }}
            />
            <Input
              id="email"
              label="Email"
              disabled={false}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Email wajib diisi",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "email tidak sesuai format",
                },
              }}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={false}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Password wajib diisi",
                minLength: {
                  value: 8,
                  message: "Minimal 8 karakter",
                },
              }}
            />
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              disabled={false}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Konfirmasi password wajib diisi",
                minLength: {
                  value: 8,
                  message: "Minimal 8 karakter",
                },
                validate: {
                  matchesPreviousPassword: (value: string) => {
                    const { password } = getValues();
                    return password === value || "Password tidak sama";
                  },
                },
              }}
            />
            <div className="w-full flex justify-between items-center gap-4">
              <p className="font-semibold">Role</p>
              <select
                {...register("roleId")}
                className="border h-full w-[60%] p-2 text-center"
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
            <Button
              label="Register"
              onClick={() => {}}
              disabled={roleLoading ? true : false}
            />
          </form>
      )}
    </div>
  );
};

export default AddUserForm;
