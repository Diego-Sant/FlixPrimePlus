import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res);

        const {movieId} = req.query;

        if(typeof movieId !== 'string') {
            throw new Error("ID inválido!")
        }

        if(!movieId) {
            throw new Error("ID inválido!")
        }

        const movies: {[key: string]: any} = {emAlta: prismadb.emAlta, series: prismadb.series, action: prismadb.action, anime: prismadb.anime, movieAnimation: prismadb.movieAnimation, incoming: prismadb.incoming, nostalgic: prismadb.nostalgic, oldSeries: prismadb.oldSeries, sports: prismadb.sports, superHero: prismadb.superHero}

        let existingMovie = null;

            // Percorre todos os movies
        for (const movie of Object.keys(movies)) {
            const movieOfType = await movies[movie].findUnique({
                where: {
                    id: movieId,
                },
            });

            if (movieOfType !== null) {
                // Filme encontrado, interrompe o loop
                existingMovie = movieOfType;
                break;
            }
        }

        if (!existingMovie) {
            throw new Error("ID inválido!")
        }

        return res.status(200).json(existingMovie);
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}