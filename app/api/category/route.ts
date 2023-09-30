import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  return NextResponse.json(category);
}

export async function GET(request: Request) {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}