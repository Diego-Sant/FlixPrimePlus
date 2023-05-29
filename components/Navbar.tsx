import Image from "next/image";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

import { BsSearch, BsBell } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

// Valor em pixels usado para quando a tela ultrapassar esse valor acontecer algo
const TOP_OFFSET = 66;

const Navbar  = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const [showBackground, setShowBackground] = useState(false);

    const [imageSrc, setImageSrc] = useState('');
    const {data: user} = useCurrentUser();

    // Adicionar um fundo preto no navbar quando a tela passar de 66 pixels
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Caso o mouse passe por cima
    const handleMouseEnter = useCallback(() => {
        setShowMobileMenu(true);
        setShowAccountMenu(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    }, [timeoutId]);

    // Caso o mouse saia de cima + timeout para sumir o container depois de 0.5 segundos
    const handleMouseLeave = useCallback(() => {
        setTimeoutId(
            setTimeout(() => {
              setShowMobileMenu(false);
            }, 500)
        );
    }, []);

    const handleAccountMouseEnter = useCallback(() => {
        setShowAccountMenu(true);
        setShowMobileMenu(false);
        if (timeoutId) {
          clearTimeout(timeoutId);
          setTimeoutId(null);
        }
    }, [timeoutId]);
    
    const handleAccountMouseLeave = useCallback(() => {
        setTimeoutId(
            setTimeout(() => {
              setShowAccountMenu(false);
            }, 500)
        );
    }, []);

    // Feito isso para buscar uma dessas imagens aleatóriamente
    const getRandomImage = () => {
        const images = [
            'default-blue',
            'default-green',
            'default-purple',
            'default-red',
            'default-slate',
            'default-yellow',
        ];
        // Transformas as imagens em index para assim pegar uma index aleatório
        const randomIndex = Math.floor(Math.random() * images.length);
        return `/images/${images[randomIndex]}.png`
    }

    useEffect(() => {
        const randomImage = getRandomImage();
        setImageSrc(randomImage);
    }, []);

    const imageStyle = {
        width: 'auto',
        height: 'auto',
    };

    return (
        <nav className="w-full fixed z-40">
            {/* style de background para colocar um degradê que no topo é #090909 e embaixo é #141414 que é exatamente a cor de fundo do site, isso só irá acontecer quando o showBackground for ativado */}
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? "bg-[#090909] bg-opacity-90" : ""} ${showBackground ? "bg-gradient-to-b from-[#090909] to-[#141414]" : ""}`}>
                <Image src="/images/logo.png" alt="FlixPrime+" width={90} height={90} priority={true} style={imageStyle} />
                <div className="flex-row ml-8 text-sm gap-7 hidden lg:flex">
                    <NavbarItem label="Início" />
                    <NavbarItem label="Séries" />
                    <NavbarItem label="Filmes" />
                    <NavbarItem label="Bombando" />
                    <NavbarItem label="Minha lista" />
                    <NavbarItem label="Navegar por idiomas" />
                </div>
                {/* Colocado onMouseEnter e onMouseLeave para aparecer e sair o container caso o mouse esteja em cima ou não */}
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Navegar</p>
                    <p className={`text-white transition`}>▾</p>
                    {showMobileMenu && <MobileMenu visible={showMobileMenu} />}
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch size={18} />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell size={18} />
                    </div>
                    <div onMouseEnter={handleAccountMouseEnter} onMouseLeave={handleAccountMouseLeave} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-md overflow-hidden">
                            {/* Feito isso pois o next.js imagina que possa ter uma situação que a imagem e o alt não seria utilizados */}
                            <Image src={imageSrc || "/images/default-blue.png"} alt={user?.name || "Foto de perfil"} width={100} height={100} priority={true} style={imageStyle} />
                        </div>
                        <p className={`text-white text-[20px] lg:flex sm:hidden transition duration-500 ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}>▾</p>
                        {showAccountMenu && <AccountMenu visible={showAccountMenu} imageSrc={imageSrc} />}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;