"use client";

import ModuleItem from "./ModuleItem";
import { moduleData } from "../../constant/ModuleData";

const Module = () => {
  return (
    <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-3 justify-items-center content-center gap-x-6 gap-y-4">
      {moduleData.map((module, index) => (
        <div key={index}>
        <ModuleItem
          icon={module.icon}
          label={module.name}
          path={module.path}
        />
        </div>
      ))}
    </div>
  );
};

export default Module;
