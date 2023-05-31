import React, { useState } from "react";

import ReactPlayer from "react-player";

import { BsFillPlayFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import FavoriteButton from "./FavoriteButton";

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({data}) => {
    // Retirar a vírgula, pegar as 3 primeiras palavras e adicionar um • entre as palavras
    const formattedGenre = data?.genre ? data?.genre.split(",").slice(0, 3).join(" • ") : "";

    const [isHovered, setIsHovered] = useState(false);
    const [isAutoplay, setIsAutoplay] = useState(false);
    const [muted, setMuted] = useState(true);

    const handleToggleMute = () => {
        setMuted((prevMuted) => !prevMuted);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsAutoplay(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsAutoplay(false);
        setMuted(true); // Desativa o áudio quando o hover é removido
    };
    
    return (
        <div className="group col-span relative lg:h-[11vw] md:h-[15vw] h-[20vw] mb-5 xl:mb-36 lg:mb-20" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {/* eslint-disable-next-line */}
            <img className="cursor-pointer transition duration shadow-xl rounded-sm group-hover:opacity-90 sm:group-hover:opacity-0 delay-300" src={data.thumbnailUrl} alt={data?.title}/>
            <div className="opacity-0 absolute top-0 transition duration-200 z-50 invisible w-[25vw] h-[20vw] sm:visible delay-300 scale-0 group-hover:scale-110 group-hover:-translate-y-[6.5vw] group-hover:translate-x-[2.7vw] group-hover:opacity-100">
                { data?.videoUrl ? 
                <ReactPlayer className="w-full object-cover cursor-pointer" style={{ pointerEvents: "none" }} url={data?.videoUrl} playing={isHovered && isAutoplay} loop muted={muted} controls={false} width="100%" height="100%" config={{
                        youtube: {
                            playerVars: {
                                disablekb: 1,
                                modestbranding: 1,
                                rel: 0,
                                fs: 0,
                            }
                        }
                }} />
                // eslint-disable-next-line
                : <img className="w-full object-cover cursor-pointer" src={data?.thumbnailUrl} alt={data?.title}></img>} 


                <div className="z-50 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                        <div onClick={() => {}} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                            <BsFillPlayFill className="marginfifteen" size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                        {data?.videoUrl ? <div onClick={handleToggleMute} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-transparent border-white border-2 rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                            {muted ? <FaVolumeMute className="text-white lg:text-[15px] text-[10px]" /> : <FaVolumeUp className="text-white lg:text-[15px] text-[10px]"/>}
                        </div> : ""}
                    </div>
                    {data?.rating ? 
                    <div className="flex flex-row items-center">
                        <AiFillStar className="mt-3 mr-2 text-[#f5c518]" />
                        <p className="text-white text-sm font-semibold mt-3">{data?.rating}/10</p>
                    </div> : ""}
                    <div className="flex flex-row mt-3 gap-2 items-center">
                        <div className="h-5 w-5">
                            {/* eslint-disable-next-line */}
                            {data?.contentRatingUrl ? <img src={data?.contentRatingUrl} alt="Classificação do Conteúdo"/> : ""}
                        </div>
                        {data?.duration ? <p className="text-white text-[10px] lg:text-sm">{data?.duration}</p> : ""}
                        {/* eslint-disable-next-line */}
                        {data?.duration && data?.contentRatingUrl ? <img className="h-4 w-4" src="/images/hdicon.png" alt="HD"/> : ""}
                    </div>
                    {data?.duration && data?.contentRatingUrl ? "" : <p className="text-white text-[10px] lg:text-sm -mt-4">{data?.description}</p>}
                    <div className="text-white text-center text-[13px] lg:text-sm mt-3">
                        {formattedGenre}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;