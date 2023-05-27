import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";

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
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-4xl text-green-500">FlixPrime+</h1>
      <p className="text-white">Logado como: {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Sair</button>
    </>
  )
}
