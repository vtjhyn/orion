import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  productId: string;
}

export async function DELETE(request: Request,{ params }: { params: IParams }) {
  const { productId } = params;

  const product = await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return NextResponse.json(product);
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { productId } = params;
  const body = await request.json();
  const { name, description, price, quantity, unitId, categoryId } = body;

  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name:  name,
      description: description,
      price: price,
      quantity: quantity,
      unit: {
        connect: {
          id : unitId,
        }
      },
      category: {
        connect: {
          id : categoryId,
        }
      },
    },
  });

  return NextResponse.json(product);
}

export async function GET(request: Request,{ params }: { params: IParams }) {
  const { productId } = params;
  const products = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      unit: true,
      category: true
    },
  });
  return NextResponse.json(products);
}
