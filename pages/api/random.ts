import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        await serverAuth(req);

        const movieCount = await prismadb.emAlta.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        // Pegar um filme entre um número aleatório de filmes que são separados por index
        const randomMovies = await prismadb.emAlta.findMany({
            take: 1,
            skip: randomIndex
        });

        return res.status(200).json(randomMovies[0]);
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}