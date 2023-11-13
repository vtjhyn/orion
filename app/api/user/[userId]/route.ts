import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IParams {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { userId } = params;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { name, email, password, roleId } = body;

    if (!password) {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          role: {
            connect: {
              id: roleId,
            },
          },
        },
        include: {
          role: true,
        },
      });

      return NextResponse.json(user);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword,
        },
        include: {
          role: true,
        },
      });

      return NextResponse.json(user);
    }
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
