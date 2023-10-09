import RegisterForm from "@/components/form/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <h1 className="font-bold text-xl">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
