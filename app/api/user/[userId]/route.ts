import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IParams {
  userId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { userId } = params;

  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return NextResponse.json(user);
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { userId } = params;
  const body = await request.json();
  const { name, email, password, roleId } = body;

  if (!password) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
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
        hashedPassword: hashedPassword,
      },
      include: {
        role: true,
      },
    });
    return NextResponse.json(user);
  }
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });
  return NextResponse.json(user);
}
