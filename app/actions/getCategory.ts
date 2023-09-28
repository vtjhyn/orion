import prisma from '@/libs/prismadb';

export default async function getCategory() {
  const categories = await prisma.category.findMany();
  return categories;
}