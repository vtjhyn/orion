'use client'

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  return ( 
    <div className="h-full flex justify-center items-center">
      <Button 
        label='User'
        onClick={() => router.push('/setting/user')}
      />
    </div>
   );
}
 
export default SettingsPage;