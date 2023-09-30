import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const unit = await prisma.unit.create({
    data: {
      name,
    },
  });

  return NextResponse.json(unit);
}

export async function GET(request: Request) {
  const units = await prisma.unit.findMany();
  return NextResponse.json(units);
}
