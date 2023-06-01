import React from "react";

import { BsFillPlayFill } from "react-icons/bs";

import { useRouter } from "next/router";

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({movieId}) => {
    const router = useRouter();

    return (
        <button onClick={() => router.push(`/assistir/${movieId}`)} className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex cursor-pointer flex-row items-center hover:bg-opacity-20 transition">
            <BsFillPlayFill className="lg:text-[30px] text-[20px] mr-1" /> Assistir
        </button>
    )
}

export default PlayButton;