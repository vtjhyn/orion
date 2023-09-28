"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full flex justify-between items-center gap-4">
      <p className="w-[40%] font-semibold">{label}</p>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`w-full p-2 font-light bg-white border rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
    </div>
  );
};

export default Input;
