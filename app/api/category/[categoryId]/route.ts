import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  categoryId: string;
}

export async function DELETE(request: Request,{ params }: { params: IParams }) {
  const { categoryId } = params;

  const category = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return NextResponse.json(category);
}

export async function POST(request: Request, {params}: {params: IParams}) {
  const {categoryId} = params;
  const body = await request.json();
  const { name } = body;

  const category = await prisma.category.update({
      where : {
        id: categoryId,
      },
      data: {
        name,
      }
  });

  return NextResponse.json(category);
}

export async function GET(request: Request) {
  const body = await request.json();
  const { id } = body;
  const categories = await prisma.category.findUnique({
    where : {
      id : id,
    }
  });
  return NextResponse.json(categories);
}
