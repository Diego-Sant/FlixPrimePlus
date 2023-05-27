import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {compare} from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismadb from "@/lib/prismadb";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        Credentials({
            id: 'credentials', // Chamado no login.tsx
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Senha',
                    type: 'password'
                }
            },
            async authorize(credentials) {

                // Conferir se o email e a senha foram preenchidos
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios!");
                }

                // Associar o email usado nas credenciais com o email do usuário cadastrado
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // Caso o banco de dados não encontre o email
                if (!user || !user.hashedPassword) {
                    throw new Error('Desculpe, não encontramos uma conta com esse endereço de email.')
                }

                // Comparar a senha colocada pelo usuário com a senha criptografada
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                // Caso a comparação não bata
                if (!isCorrectPassword) {
                    throw new Error("Senha incorreta!")
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    // Ativar o debug quando estiver em processo de desenvolvimento
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    // Usar tokens JWT
    session: {
        strategy: 'jwt',
    },
    // Usado para verificar os tokens JWT
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    // Proteger e assinar os cookies da sessão
    secret: process.env.NEXTAUTH_SECRET
})