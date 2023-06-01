import Billboard from "@/components/Billboard";
import MovieNavbarList from "@/components/MovieNavbarList";
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
        <MovieNavbarList title="Em alta" data={sortByRating(movies)} />
      </div>
    </>
  )
}
