import React from "react";

import { signOut } from "next-auth/react";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
    visible?: boolean,
    imageSrc?: string,
}

const AccountMenu: React.FC<AccountMenuProps>  = ({visible, imageSrc}) => {
    const {data: user} = useCurrentUser();

    const firstName = user?.name.split(' ')[0];

    if (!visible) {
        return null;
    }

    const imageStyle = {
        width: 'auto',
        height: 'auto',
    };
    
    return (
        <div className="bg-black w-56 absolute top-11 righ-0 -ml-40 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                {/* group/item é uma maneira de selecionar múltiplos grupos dentro de outros grupos*/}
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <Image className="w-8 rounded-md" src={imageSrc || "/images/default-blue.png"} alt={user?.name || "Foto de perfil"} width={20} height={20} priority={true} style={imageStyle} />
                    <p className="text-white text-sm group-hover/item:underline">{firstName}</p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-2"/>
                <div className="w-4 h-4 bg-white absolute transform rotate-45 -top-1" style={{ left: "calc(100% - 52px)" }}></div>
                {/* Quadrado preto para tirar uma parte do quadrado branco e transformar em triângulo, feito o calc no bottom por ser um número longo e muito específico*/}
                <div className="w-8 h-5 bg-black border-t-2 border-gray-800 -top-0.5 absolute right-0 mx-auto" style={{bottom: "calc(100% - 16px)", left: "calc(100% - 90px)"}}></div>
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                    Sair da FlixPrime+
                </div>
            </div>
        </div>
    )
}

export default AccountMenu;