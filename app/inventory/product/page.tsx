import getUnit from "@/app/actions/getUnit";
import getCategory from "@/app/actions/getCategory";
import ProductForm from "@/components/form/ProductForm";

const ProductPage = async () => {
  const units = await getUnit();
  const categories = await getCategory();
  return (
    <div className="h-full flex justify-center items-center">
      <ProductForm units={units} categories={categories} />
    </div>
  );
};

export default ProductPage;
