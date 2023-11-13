import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  materialId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { materialId } = params;

    const existingMaterial = await prisma.material.findUnique({
      where: {
        id: materialId,
      },
    });

    if (!existingMaterial) {
      return NextResponse.json("Material not found", { status: 404 });
    }

    const material = await prisma.material.delete({
      where: {
        id: materialId,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { materialId } = params;
    const body = await request.json();
    const { imgUrl, name, quantity, unitId } = body;

    const material = await prisma.material.update({
      where: {
        id: materialId,
      },
      data: {
        imgUrl,
        name,
        quantity,
        unit: {
          connect: {
            id: unitId,
          },
        },
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(material);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { materialId } = params;
    const materials = await prisma.material.findUnique({
      where: {
        id: materialId,
      },
      include: {
        unit: true,
      },
    });

    if (!materials) {
      return NextResponse.json("Material not found", { status: 404 });
    }

    return NextResponse.json(materials);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
