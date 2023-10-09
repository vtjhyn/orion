"use client";
import { CategoryTypes } from "@/types/category";
import CategoryList from "./(components)/CategoryList";
import ProductList, { ProductItem } from "./(components)/ProductList";
import ItemList from "./ItemList";
import OrderList from "./OrderList";
import DUMMY_PRODUCTS from "@/__dummy__/products.json";
import { SearchOutlined } from "@ant-design/icons";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";

const POSTClient = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [searchMode, setSearchMode] = useState(false);

  return (
    <div className="h-ful max-w-full flex gap-2 bg-gra-200">
      <div className="flex w-9/12 flex-1 flex-col px-4 h-4/6 gap-2">
        {/* <div className=" flex items-center gap-3">
          <button
            type="button"
            className="bg-blue-950  text-white w-16 h-16 rounded-full"
          >
            <SearchOutlined className="text-4xl" />
          </button>
          <div className="border border-l-2 h-16 mx-1  border-gray-200" />

        </div> */}
          <CategoryList
            items={[
              "All Items",
              "Top Orders",
              "Foods",
              "Drinks",
              "Side Dish",
              "lorem ipsum",
              "dolor sit amer",
              "dolor sit amer",
              "dolor sit amer",
              "test",
            ]}
          />

        <ProductList items={DUMMY_PRODUCTS as ProductItem[]} />
      </div>
      <div className="w-[500px] flex flex-grow bg-white flex-col shadow-xl">
        <div>Order Item</div>
        <div>Order Summary</div>
        <div>Order Pads</div>
      </div>
    </div>
  );
};

export default POSTClient;
