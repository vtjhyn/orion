import prisma from '@/libs/prismadb';

export default async function getUnit() {
  const units = await prisma.unit.findMany();
  return units;
}