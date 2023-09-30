import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, price, quantity, unitId, categoryId } = body;


  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
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

export async function GET(request: Request) {
  const products = await prisma.product.findMany({
    include: {
      unit: true,
      category: true
    },
  });
  return NextResponse.json(products);
}
