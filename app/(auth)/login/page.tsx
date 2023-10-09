import LoginForm from "@/components/form/LoginForm";

const LoginPage = () => {
  return ( 
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <h1 className="font-bold text-xl">Login</h1>
      <LoginForm />
    </div>
   );
}
 
export default LoginPage;