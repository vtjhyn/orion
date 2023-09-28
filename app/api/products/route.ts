import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    name,
    description,
    price,
    quantity,
    unit,
    category,
  } = body;
  
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      unit,
      category
    }
  });

  return NextResponse.json(product);
}