"use client";
import { CategoryTypes } from "@/types/category";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";

export interface ProductItem {
  name: string;
  price: number;
  qty: number;
  imgUrl?: string;
  description?: string;
  icons?: string;
  category: CategoryTypes;
}

interface ProductListProps {
  items: ProductItem[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  return (
    <div className=" h-[540px] ">
      <div className="flex flex-wrap overflow-x-auto small-scroll-bar flex-col w-fit relative h-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`p- relative w-72 flex-shrink-0 h-40 mx-3 my-2 shadow-md rounded-lg hover:shadow-lg`}
          >
            <div className="w-full h-full absolute rounded-lg z-0 bg-[rgba(0,0,0,0.5)]" />
            <div className="w-full h-full absolute rounded-lg -z-10 bg-red-200">
              <Image
                alt="product-img"
                src={item.imgUrl ?? ""}
                fill
                objectFit="cover"
              />
            </div>

            <div className="text-white z-10 relative p-3 rounded-lg h-full flex flex-col justify-between">
              <div >
                <p className="text-xl font-bold truncate line-clamp-2 whitespace-pre-line ">{item.name}</p>
                <span className="text-sm font-medium">Qty. {item.qty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Rp. {item.price}</span>
                <div className="cursor-pointer self-end p-4 bg-white text-black flex rounded-full justify-center items-center">
                  <PlusOutlined />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
