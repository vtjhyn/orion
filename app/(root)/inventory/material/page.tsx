"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MaterialProps, deleteMaterial, getMaterial, getMaterialById } from "@/store/slice/materialSlice";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

const MaterialPage = () => {
  const router = useRouter();
  const ref = useRef(false);
  const { data, isLoading } = useSelector((state: RootState) => state.material);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getMaterial());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  const onDelete = (data: any) => {
    dispatch(deleteMaterial(data))
      .then((result: any) => {
        console.log("Material Deleted:", result.payload);
        // Buat notif
      })
      .catch((error: any) => {
        console.error("Error delete material:", error);
      });
  };

  const onEdit = (data: any) => {
    dispatch(getMaterialById(data.id)).then((result: any) => {
      router.push(`/inventory/material/${result.payload.id}`);
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
        <Container className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="w-[150px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
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
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>{data.unit.name}</TableCell>
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

export default MaterialPage;
