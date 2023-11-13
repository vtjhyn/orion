import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imgUrl, name, quantity, unitId } = body;

    const material = await prisma.material.create({
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

    return NextResponse.json(material);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    const materials = await prisma.material.findMany({
      include: {
        unit: true,
      },
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
