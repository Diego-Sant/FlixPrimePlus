import React, { useState, useCallback } from "react";

import useBillboard from "@/hooks/useBillboard";

import ReactPlayer from "react-player";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai"

import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
    const {data} = useBillboard();

    const [muted, setMuted] = useState(true);

    const {openModal} = useInfoModal();
    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id])

    const handleToggleMute = () => {
        setMuted((prevMuted) => !prevMuted);
    };

    return (
        <>
            {data && (
                <div className="relative h-[56.25vw] topsmall -top-20"> {/* o elemento terá 56.25% da largura da tela */}
                    <ReactPlayer className="w-full h-[56.25vw] object-cover brightness-[60%]" style={{ pointerEvents: "none" }} url={data?.videoUrl} playing={true} loop muted={muted} controls={false} width="100%" height="100%" config={{
                        youtube: {
                            playerVars: {
                                disablekb: 1,
                                modestbranding: 1,
                                rel: 0,
                                fs: 0,
                            }
                        }
                    }} poster={data?.thumbnailUrl} />
                    <div className="buttonsize absolute top-[65%] z-20 md:top-[60%] xl:top-[80%] right-20">
                        <button className="absolute text-white buttonsmall border-2 z-10 right-16 rounded-full p-2" onClick={handleToggleMute}>
                            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        {/* eslint-disable-next-line */}
                        <img className="h-10 w-10 mt-2.5 contentsmall" src={data?.contentRatingUrl} alt={"Classificação do Conteúdo"}/>
                    </div>
                    <div className="absolute top-[55%] md:top-[60%] xl:top-[65%] ml-4 z-10 md:ml-16">
                        <p className="text-white text-1xl md:text-3xl h-full w-[50%] lg:text-5xl font-bold drop-shadow-xl">{data?.title}</p>
                        <p className="text-white descriptiontext text-[10px] md:text-lg mt-2 md:mt-6 w-[60%] md:w=[80%] lg:w-[80%] xl:w-[50%] drop-shadow-xl">{data?.description}</p>
                        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                            <PlayButton movieId={data?.id}/>
                            <button onClick={handleOpenModal} className="bg-white smaller text-white bg-opacity-40 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex cursor-pointer flex-row items-center hover:bg-opacity-20 transition"><AiOutlineInfoCircle className="lg:text-[30px] text-[20px] mr-1" /> Mais informações</button>
                        </div>
                    </div>
                    <div className="bottom-overlay"></div>
                </div>
            )}
        </>
    )
}

export default Billboard;