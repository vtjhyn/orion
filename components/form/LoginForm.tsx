"use client";

import Button from "../Button";
import Input from "../Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        console.log("SUKSES");
        // buat notif

        router.push('/')
      }
      if (callback?.error) {
        console.log("GAGAL");
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] flex flex-col gap-8"
        id="productform"
      >
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
        <Button label="Login" onClick={() => {}} />
      </form>
      <p>
        Belum punya akun?
        <span
          onClick={() => router.push("/register")}
          className="cursor-pointer hover:underline text-red-500"
        >
          Register disini
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
