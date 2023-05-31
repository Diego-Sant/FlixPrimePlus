import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
      return res.status(405).end();
  }

  try {
      
      const {currentUser} = await serverAuth(req, res);

      const movies: {[key: string]: any} = {emAlta: prismadb.emAlta, series: prismadb.series, action: prismadb.action, anime: prismadb.anime, movieAnimation: prismadb.movieAnimation, incoming: prismadb.incoming, nostalgic: prismadb.nostalgic, oldSeries: prismadb.oldSeries, sports: prismadb.sports, superHero: prismadb.superHero}

      let favoriteMovies: any[] = [];

      // Percorre todos os movies
      for (const movie of Object.keys(movies)) {
        const moviesOfType = await movies[movie].findMany({
          where: {
            id: {
              in: currentUser?.favoriteIds,
            },
          },
        });
      
        if (moviesOfType !== null) {
          // Filme encontrado, interrompe o loop
          favoriteMovies = [...favoriteMovies, ...moviesOfType];
        }
      }

      // Lógica para caso tenha mais de um filme com o mesmo ID, todos sejam removidos e fique apenas um
      const movieIds = new Set();
      const uniqueFavoriteMovies = favoriteMovies.filter((movie) => {
        if (movieIds.has(movie.id)) {
          return false; // Remove filmes duplicados
        }
        movieIds.add(movie.id);
        return true;
      }) // Colocar por ordem do usuário, ou seja, retirar a ordem do em alta ser sempre o primeiro e deixar o usuário montar sua própria ordem
      .sort((a: any, b: any) => {
        const orderA = currentUser.favoriteIds.indexOf(a.id);
        const orderB = currentUser.favoriteIds.indexOf(b.id);
        return orderA - orderB;
      })

      return res.status(200).json(uniqueFavoriteMovies);

  } catch (error) {
      console.log(error);
      return res.status(400).end();
  }
}