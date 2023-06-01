import React from "react";

import { useRouter } from "next/router";

interface MobileMenuProps {
    visible?: boolean,
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) => {
    const router = useRouter();

    if(!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-7 left-0 py-5 flex-col border-t-2 border-white flex">
            <div className="flex flex-col gap-4">
            {/* Usado um quadrado e rotacionado em 45 graus para parecer um triângulo, -top-2 para deixar em cima do container e
            usado calc no left pois o tamanho certo seria left-15, mas só tem 14 e 16 */}
            <div className="w-4 h-4 bg-white absolute transform rotate-45 -top-2" style={{ left: "calc(29.5% - 7px)" }}></div>
            {/* Quadrado preto para tirar uma parte do quadrado branco e transformar em triângulo, feito o calc no bottom por ser um número longo e muito específico*/}
            <div className="w-8 h-4 bg-black absolute -left-24 right-0 mx-auto" style={{bottom: "calc(100% - 16px)"}}></div>
                <div onClick={() => router.push("/")} className="px-3 text-center text-white hover:underline">Início</div>
                <div onClick={() => router.push("/genero/serie")} className="px-3 text-center text-white hover:underline">Séries</div>
                <div onClick={() => router.push("/genero/filmes")} className="px-3 text-center text-white hover:underline">Filmes</div>
                <div onClick={() => router.push("/genero/emalta")} className="px-3 text-center text-white hover:underline">Bombando</div>
                <div onClick={() => router.push("/genero/minhalista")} className="px-3 text-center font-bold text-white hover:underline">Minha lista</div>
            </div>
        </div>
    )
}

export default MobileMenu;