import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useDataList from "@/hooks/useDataList";
import InfoModal from "@/components/InfoModal";

import useInfoModal from "@/hooks/useInfoModal";

// Não é possivel usar o serverAuth pois o index.tsx faz parte do client
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // Conferir se existe uma conta no session em Rede, caso não tenha, irá direcionar o usuário para /login
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }

  // Sempre é necessário retornar algo caso o if do getServerSideProps não ative
  return {
    props: {}
  }
}

export default function Home() {
  const {data: movies = []} = useDataList("api/movies");
  const {data: action = []} = useDataList("api/action");
  const {data: series = []} = useDataList("api/series");
  const {data: anime = []} = useDataList("api/anime");
  const {data: incoming = []} = useDataList("api/incoming");
  const {data: superheroes = []} = useDataList("api/superheroes");
  const {data: oldseries = []} = useDataList("api/oldseries");
  const {data: cartoonmovie = []} = useDataList("api/cartoonmovie");
  const {data: nostalgic = []} = useDataList("api/nostalgic");
  const {data: sports = []} = useDataList("api/sports");

  const { isOpen, closeModal } = useInfoModal();

  // Ordenar lista por ordem de rating(nota)
  const sortByRating = (data: Record<string, any>[]) => {
    return data.sort((a, b) => b.rating - a.rating);
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40"> 
        <MovieList title="Em alta" data={sortByRating(movies)} />
        <MovieList title="Ação" data={sortByRating(action)} />
        <MovieList title="Séries" data={sortByRating(series)} />
        <MovieList title="Animes" data={sortByRating(anime)} />
        <MovieList title="Em breve" data={incoming} />
        <MovieList title="Super-heróis" data={sortByRating(superheroes)} />
        <MovieList title="Séries antigas" data={sortByRating(oldseries)} />
        <MovieList title="Filmes animados" data={sortByRating(cartoonmovie)} />
        <MovieList title="Nostálgico" data={sortByRating(nostalgic)} />
        <MovieList title="Esportes" data={sortByRating(sports)} />
      </div>
    </>
  )
}
