"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const InventoryPage = () => {
  const router = useRouter();
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[150px]">
        <Button
          label="Product"
          onClick={() => router.push("/inventory/product")}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
