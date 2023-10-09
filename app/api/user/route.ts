import prisma from "@/libs/prismadb";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, roleId } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: {
        connect: {
          id : roleId,
        }
      },
    },
    include: {
      role: true
    }
  });

  return NextResponse.json(user);
}

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  return NextResponse.json(users);
}
