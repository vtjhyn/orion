"use client";

import { useState } from "react";

interface CategoryListProps {
  items: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState("All Items");

  const handleClickItem = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="max-w-full h-fit flex flex-grow-0 gap-4 small-scroll-bar py-2 relative overflow-x-auto">
      {/* <ItemList /> */}
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleClickItem(item)}
          className={`px-4 py-3 flex-shrink-0 w-max cursor-pointer rounded-md ${
            item === activeItem
              ? "font-bold bg-blue-950 text-white"
              : "font-medium bg-sky-200 text-gray-700"
          }`}
        >
          <p className="text-2xl ">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
