import { PrismaClient } from "@prisma/client";

const prsimaClient = new PrismaClient({
  log: ["query"],
});

export default prsimaClient;
