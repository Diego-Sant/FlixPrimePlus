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

    useEffect(() => {
        const randomImage = getRandomImage();
        setImageSrc(randomImage);
    }, []);

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Quem está assistindo?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        {/* group tem a mesma funcionalidade de peer do input.tsx */}
                        <div className="group flex-row w-44 mx-auto">
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <Image src={imageSrc} alt={user?.name} width={150} height={150} priority={true} style={imageStyle} />
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;