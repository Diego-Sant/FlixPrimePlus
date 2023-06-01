import React, {useCallback, useEffect, useState} from "react";

import { AiFillStar, AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import ReactPlayer from "react-player";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface InfoModalProps {
    visible?: boolean;
    onClose: any,
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose}) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const [muted, setMuted] = useState(true);

    const {movieId} = useInfoModal();
    const {data = {}} =useMovie(movieId);

    const handleToggleMute = () => {
        setMuted((prevMuted) => !prevMuted);
    };

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible])

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);
    
    if(!visible) {
        return null;
    }

    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} -top-14 transform duration-300 relative flex-auto bg-[#141414] drop-shadow-md`}>
                    <div className="relative h-[30rem]">

                        { data?.videoUrl ? 
                            <ReactPlayer className="w-full object-cover h-full brightness-[60%] cursor-pointer" style={{ pointerEvents: "none" }} url={data?.videoUrl} playing={true} loop muted={muted} width="100%" height="100%" controls={false} config={{
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
                            : <img className="w-full object-cover cursor-pointer" src={data?.thumbnailUrl} alt={data?.title}></img> }
                        
                        <div className="bottom-overlaymodal"></div>

                        <div className="cursor-pointer absolute top-16 right-3 h-10 w-10 rounded-full hover:bg-opacity-50 bg-black bg-opacity-70 flex items-center justify-center" onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>

                        <div className="absolute md:bottom-[22%] bottom-[32%] left-7">
                            <p className="text-white text-2xl md:text-3xl h-full lg:text-4xl font-bold mb-8">{data?.title}</p>
                            <div className="flex flex-row lg:gap-[480px] md:gap-[550px] sm:gap-[400px] gap-[260px] items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <PlayButton movieId={data?.id} />
                                    <FavoriteButton movieId={data?.id} />
                                </div>
                                {data?.videoUrl ? <div onClick={handleToggleMute} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-transparent border-white border-2 rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                                {muted ? <FaVolumeMute className="text-white lg:text-[15px] text-[10px]" /> : <FaVolumeUp className="text-white lg:text-[15px] text-[10px]"/>}
                                </div> : ""}
                            </div>
                        </div>
                    
                    </div>

                                                
                    <div className="flex flex-row z-50 relative -top-14">
                        <div className="px-12 py-5 max-w-[600px]">
                            <div className="flex flex-row gap-2 items-center">
                                {data?.duration ? <>
                                <p className="text-md text-gray-400">{data?.duration}</p>
                                {/* eslint-disable-next-line */}
                                <img className="h-4 w-4" src="/images/hdicon.png" alt="HD"/> 
                                </> : ""}
                            </div>
                            {data?.rating ? 
                            <div className="flex flex-row items-center">
                                <AiFillStar className="mt-3 mr-2 text-[#f5c518]" />
                                <p className="text-white text-sm font-semibold mt-3">{data?.rating}/10</p>
                            </div> : ""}
                            <div className="h-5 w-5 mt-3">
                                {/* eslint-disable-next-line */}
                                {data?.contentRatingUrl ? <img src={data?.contentRatingUrl} alt="Classificação do Conteúdo"/> : ""}
                            </div>
                            {data?.duration || data?.rating || data?.contentRatingUrl ? <p className="text-white text-md mt-3">{data?.description}</p> : <p className="text-white text-md -mt-7">{data?.description}</p>}
                        </div>

                        {data?.genre ? <p className="text-white text-md pt-5 mr-2"><span className="text-gray-400">Gêneros:</span> {data?.genre}</p> : ""}
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal;