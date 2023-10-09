import { AppDispatch } from "@/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { UserProps, editUser } from "@/store/slice/userSlice";

interface ModalProps {
  onClose: () => void;
  user: UserProps[];
}

const ChangePasswordModal: React.FC<ModalProps> = ({ onClose, user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({});

  const onSubmit = (data: any) => {
    data.id = user[0].id
    dispatch(editUser(data))
      .then((result) => {
        console.log("User edited:", result.payload);
        // Buat notif
        onClose();
      })
      .catch((error) => {
        console.error("Error user product:", error);
      });
  };

  return (
    <div className="relative bg-white p-4 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] flex flex-col gap-8"
        id="changePassword"
      >
        <Input
          id="password"
          label="New Password"
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
        <Button label="Save" onClick={() => {}} />
      </form>
    </div>
  );
};

export default ChangePasswordModal;
