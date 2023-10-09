import AddUserForm from "@/components/form/AddUserForm";

const AddUserPage = () => {
  return ( 
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <h1 className="font-bold text-xl">Add User</h1>
      <AddUserForm />
    </div>
   );
}
 
export default AddUserPage;