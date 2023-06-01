import React from "react";

import useMovie from "@/hooks/useMovie";

import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReactPlayer from "react-player";

const Watch = () => {
    const router = useRouter();
    const {movieId} = router.query;

    const {data} = useMovie(movieId as string);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <AiOutlineArrowLeft onClick={() => router.push("/")} className="text-white mt-1 cursor-pointer" size={30} />
                <p className="text-white text-1xl md:text-3xl font0bold"><span className="font-light">Assistindo: </span> {data?.title}</p>
            </nav>
            { data?.videoUrl ? 
                <ReactPlayer className="w-full object-cover cursor-pointer" url={data?.videoUrl} playing={false} loop muted={false} controls={true} width="100%" height="100%" config={{
                        youtube: {
                            playerVars: {
                                disablekb: 1,
                                modestbranding: 1,
                                rel: 0,
                                fs: 1,
                            }
                        }
                }} />
                // eslint-disable-next-line
                : <img className="w-full object-cover cursor-pointer" src={data?.thumbnailUrl} alt={data?.title}></img>} 
        </div>
    )
}

export default Watch;