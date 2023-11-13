import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  unitId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { unitId } = params;

    const existingUnit = await prisma.unit.findUnique({
      where: {
        id: unitId,
      },
    });

    if (!existingUnit) {
      return NextResponse.json("Unit not found", { status: 404 });
    }

    const unit = await prisma.unit.delete({
      where: {
        id: unitId,
      },
    });

    return NextResponse.json(unit);
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
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
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const units = await prisma.unit.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!units) {
      return NextResponse.json("Unit not found", { status: 404 });
    }

    return NextResponse.json(units);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
