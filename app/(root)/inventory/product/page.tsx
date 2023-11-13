"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProductProps,
  deleteProduct,
  getProduct,
  getProductById,
} from "@/store/slice/productSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Loader from "@/components/Loader";
import Container from "@/components/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ProductPage = () => {
  const router = useRouter();
  const ref = useRef(false);
  const { data, isLoading } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getProduct());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const onDelete = (data: any) => {
    dispatch(deleteProduct(data))
      .then((result: any) => {
        console.log("Product Deleted:", result.payload);
        // Buat notif
      })
      .catch((error: any) => {
        console.error("Error delete product:", error);
      });
  };

  const onEdit = (data: any) => {
    dispatch(getProductById(data.id)).then((result: any) => {
      router.push(`/inventory/product/${result.payload.id}`);
    });
  };

  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-[180px] ">
            <Button
              variant="test"
              onClick={() => router.push("/inventory/product/addproduct")}
            >
              Add Product
            </Button>
          </div>
          <Container>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-[150px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">
                      {data.imgUrl && (
                        <Image
                          alt="Upload"
                          style={{ objectFit: "cover" }}
                          src={data.imgUrl}
                          width={100}
                          height={100}
                          className="rounded-full h-[100px] w-[100px] mx-auto"
                        />
                      )}
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.unit.name}</TableCell>
                    <TableCell>{data.category.name}</TableCell>
                    <TableCell>
                      <Button variant="test" onClick={() => onEdit(data)}>
                        Edit
                      </Button>
                      <Button variant="test" onClick={() => onDelete(data)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
        </div>
      )}
    </>
  );
};

export default ProductPage;
