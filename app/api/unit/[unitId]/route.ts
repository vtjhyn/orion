import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  unitId: string;
}

export async function DELETE(request: Request,{ params }: { params: IParams }) {
  const { unitId } = params;

  const unit = await prisma.unit.delete({
    where: {
      id: unitId,
    },
  });

  return NextResponse.json(unit);
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { unitId } = params;
  const body = await request.json();
  const { name } = body;

  const unit = await prisma.unit.update({
    where: {
      id: unitId,
    },
    data: {
      name,
    },
  });

  return NextResponse.json(unit);
}

export async function GET(request: Request) {
  const body = await request.json();
  const { id } = body;
  const units = await prisma.unit.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(units);
}
