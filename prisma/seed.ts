import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Dropzone (optional)...");
}

main().finally(() => prisma.$disconnect());
