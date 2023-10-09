'use client'

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const router = useRouter();
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[150px]">
        <Button
          label="Add order"
          onClick={() => router.push("/pos/order/addorder")}
        />
      </div>
    </div>
  );
}
 
export default OrderPage;