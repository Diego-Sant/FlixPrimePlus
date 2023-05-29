import React, { useState } from "react";

import useBillboard from "@/hooks/useBillboard";

import ReactPlayer from "react-player";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai"

const Billboard = () => {
    const {data} = useBillboard();

    const [muted, setMuted] = useState(true);

    const handleToggleMute = () => {
        setMuted((prevMuted) => !prevMuted);
    };

    return (
        <>
            {data && (
                <div className="relative h-[56.25vw] -top-14"> {/* o elemento terá 56.25% da largura da tela */}
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
                    <div className="buttonsize absolute top-[65%] md:top-[60%] xl:top-[80%] right-20">
                        <button className="absolute text-white border-2 z-10 rounded-full p-2" onClick={handleToggleMute}>
                            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                    </div>
                    <div className="absolute top-[55%] md:top-[60%] xl:top-[65%] ml-4 md:ml-16">
                        <p className="text-white text-1xl md:text-3xl h-full w-[50%] lg:text-5xl font-bold drop-shadow-xl">{data?.title}</p>
                        <p className="text-white descriptiontext text-[10px] md:text-lg mt-2 md:mt-6 w-[60%] md:w=[80%] lg:w-[80%] xl:w-[50%] drop-shadow-xl">{data?.description}</p>
                        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                            <button className="bg-white text-white bg-opacity-40 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"><AiOutlineInfoCircle className="mr-1" /> Mais informações</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Billboard;