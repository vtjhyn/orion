"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const InventoryPage = () => {
  const router = useRouter();
  return (
    <div className="h-full flex items-center justify-center gap-10">
      <Button variant="test" onClick={() => router.push("/inventory/product")}>
        Product
      </Button>
      <Button variant="test" onClick={() => router.push("/inventory/material")}>
        Material
      </Button>
    </div>
  );
};

export default InventoryPage;
