"use client";

import Icon from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface ModuleItemProps {
  icon: any;
  label: string;
  path: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ 
  icon,
  label,
  path 
  }) => {
  const router = useRouter();
  return (
    <div className="h-[110px] w-[110px] flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-color3/20  hover:shadow-md hover:scale-105"
    onClick={() => router.push(path)}
    >
      <div className="h-[60px] w-[60px] border flex flex-col justify-center items-center rounded-md border-black text-color2">
        <Icon
          component={icon as React.ForwardRefExoticComponent<any>}
          style={{ fontSize: "25px" }}
        />
      </div>
      <p className="text-[12px] font-semibold">{label}</p>
    </div>
  );
};

export default ModuleItem;
