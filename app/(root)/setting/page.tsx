'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  return ( 
    <div className="h-full flex justify-center items-center">
      <Button variant="test" onClick={() => router.push('/setting/user')}>
        User
      </Button>
    </div>
   );
}
 
export default SettingsPage;