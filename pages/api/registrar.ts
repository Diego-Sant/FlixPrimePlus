import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    // Apenas aceitar chamadas de POST
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        const {email, name, password, confirmPassword} = req.body;

        // Mesma lógica usada no nextauth para verificar se o email existe, mas dessa vez irá retornar um erro caso o email exista e não o contrário
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            return res.status(422).json({error: "Esse email já está sendo utilizado!"})
        }

        if (password !== confirmPassword) {
            return res.status(422).json({error: "As senhas não coincidem!"})
        }

        // Criptografar a senha com um custo de 12, quanto mais custo mais seguro e demorado será o processo de criptografar
        const hashedPassword = await bcrypt.hash(password, 12);

        // Criar user com data de email, nome, senha criptografada, imagem(que está vazia) e a verificação do email
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}