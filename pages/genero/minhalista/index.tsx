import Billboard from "@/components/Billboard";
import MovieNavbarList from "@/components/MovieNavbarList";
import Navbar from "@/components/Navbar";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import InfoModal from "@/components/InfoModal";

import useInfoModal from "@/hooks/useInfoModal";
import useFavorites from "@/hooks/useFavorite";

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
  const {data: favorites = []} = useFavorites()

  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40"> 
        <MovieNavbarList title="Minha lista" data={favorites} />
      </div>
    </>
  )
}
