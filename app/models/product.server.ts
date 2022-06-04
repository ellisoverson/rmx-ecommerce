import { prisma } from "~/db.server";

export function getAllProducts() {
  return prisma.product.findMany();
}
