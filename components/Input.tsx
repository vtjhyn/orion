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
  errors: FieldErrors | any;
  validationSchema?: any;
  onChange?: (value: any) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
  validationSchema,
  onChange
}) => {
  return (
    <div>
      <div className="w-full flex justify-between items-center gap-4">
        <p className="w-[40%] font-semibold">{label}</p>
        <input
          id={id}
          disabled={disabled}
          {...register(id, validationSchema)}
          placeholder=" "
          type={type}
          className={`w-full p-2 font-light bg-white border rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
          required={required ? true : false}
          onChange={onChange}
        />
      </div>
      <div className="text-[12px] right-0 text-[#f42619] text-right mt-1">
        {errors && errors[id]?.type === "matchesPreviousPassword" && (
          <span>{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "required" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "minLength" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "pattern" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "min" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "max" && (
          <span className="error">{errors[id]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
