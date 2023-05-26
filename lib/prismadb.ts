import { PrismaClient } from "@prisma/client";

// O PrismaClient tem uma limitação de modificações, então as modificações que serão feitas para o PrismaClient
// são mandadas para o global.prismadb que não tem limitações
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;