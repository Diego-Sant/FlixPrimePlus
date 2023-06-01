import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === "POST") {
            const {currentUser} = await serverAuth(req, res);

            const {movieId} = req.body;

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

            // Lógica para caso tenha mais de um filme com o mesmo ID, todos sejam removidos e fique apenas um
            const isMovieInFavorites = currentUser.favoriteIds.includes(movieId);

            if (isMovieInFavorites) {
                const updatedFavoriteIds = currentUser.favoriteIds.filter((id: string) => id !== movieId);
        
                await prismadb.user.update({
                  where: {
                    email: currentUser.email || "",
                  },
                  data: {
                    favoriteIds: updatedFavoriteIds,
                  },
                });
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ""
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                },
            });

            return res.status(200).json(user);
        }
        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req, res);
      
            const { movieId } = req.query as { movieId: string };
      
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
              throw new Error("ID inválido!");
            }
      
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      
            const updatedUser = await prismadb.user.update({
              where: {
                email: currentUser.email || "",
              },
              data: {
                favoriteIds: updatedFavoriteIds,
              },
            });
      
            return res.status(200).json(updatedUser);
          }

          return res.status(405).end();
        } catch (error) {
          console.log(error);
      
          return res.status(500).end();
        }
      }