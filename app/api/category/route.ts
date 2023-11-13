import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imgUrl, name } = body;

    const category = await prisma.category.create({
      data: {
        imgUrl,
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

export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
