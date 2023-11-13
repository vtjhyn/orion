import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  categoryId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { categoryId } = params;

    const existingCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      return NextResponse.json("Category not found", { status: 404 });
    }

    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
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
    const { categoryId } = params;
    const body = await request.json();
    const { name } = body;

    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { categoryId } = params;
    const categories = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categories) {
      return NextResponse.json("Category not found", { status: 404 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
