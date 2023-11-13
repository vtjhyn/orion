import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Fungsi untuk menangani request POST
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      imgUrl,
      sku,
      name,
      description,
      cost,
      quantity,
      unitId,
      categoryId,
      materials,
      variants,
    } = body;

    const product = await prisma.product.create({
      data: {
        imgUrl,
        sku,
        name,
        description,
        cost,
        quantity,
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
        materials: {
          create: materials,
        },
        variants: {
          create: variants,
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

// Fungsi untuk menangani request GET
export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
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
