import { PrismaClient } from "@prisma/client"

// Feito isso para o global.prismadb parar de retornar um erro no prismadb.ts
declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}