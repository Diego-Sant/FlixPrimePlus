import useCurrentUser from "@/hooks/useCurrentUser";

import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context:NextPageContext) {
    const session = await getSession(context);

    if(!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const imageStyle = {
    width: 'auto',
    height: 'auto',
};

const getRandomImage = () => {
    const images = [
        'default-blue',
        'default-green',
        'default-purple',
        'default-red',
        'default-slate',
        'default-yellow',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return `/images/${images[randomIndex]}.png`
}

const Profiles = () => {
    const [imageSrc, setImageSrc] = useState('');
    const {data: user} = useCurrentUser();
    const router = useRouter();
    
    // Pegar apenas o primeiro nome
    const firstName = user?.name.split(' ')[0];

    useEffect(() => {
        const randomImage = getRandomImage();
        setImageSrc(randomImage);
    }, []);

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-2xl md:text-4xl text-white text-center">Quem está assistindo?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        {/* group tem a mesma funcionalidade de peer do input.tsx */}
                        <div className="group flex-row w-26 mx-auto">
                            <div className="w-26 h-26 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <Image src={imageSrc || "/images/default-blue.png"} alt={user?.name || "Foto de perfil"} width={110} height={110} priority={true} style={imageStyle} />
                            </div>
                            <div className="mt-4 text-gray-400 text-1xl text-center group-hover:text-white">
                                {firstName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;