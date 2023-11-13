import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  productId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { productId } = params;

    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { productId } = params;
    const body = await request.json();
    const { imgUrl, name, description, unitId, categoryId } = body;

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        imgUrl,
        name,
        description,
        unit: {
          connect: {
            id: unitId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { productId } = params;
    const products = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        unit: true,
        category: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
