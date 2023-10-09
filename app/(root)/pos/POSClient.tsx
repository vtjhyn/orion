import ItemList from "./ItemList";
import OrderList from "./OrderList";

const POSTClient = () => {
  return (
    <div className="h-full flex gap-2 bg-gray-200">
      <div className="w-[70%] col-span-3 bg-white">
        <ItemList />
        </div>
      <div className="w-[30%] col-span-2 bg-white">
        <OrderList />
      </div>
    </div>
  );
};

export default POSTClient;
