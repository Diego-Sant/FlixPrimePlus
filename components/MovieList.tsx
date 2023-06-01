import React, { useRef, useState } from "react";

import {isEmpty} from "lodash"

import MovieCard from "./MovieCard";

import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Define a primeira imagem como index 0

    // Quando chegar no limite máximo da array(data.length - 1), ele será reiniciado para 0, criando um carrossel infinito
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };
  
    // Lógica que se o valor for igual a 0 não poderá ir para a esquerda, caso não seja, poderá
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => prevIndex === 0 ? data.length - 1 : prevIndex - 1);
    };

    if (isEmpty(data)) {
        return null;
    }

    const startIndex = currentIndex;
    const visibleMovies = [data[startIndex], data[(startIndex + 1) % data.length], data[(startIndex + 2) % data.length]];

    const showCarouselArrows = data.length > 3;

    return (
        <div className="relative -top-32 px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
                <div className="relative">
                  <div className="grid grid-cols-3 gap-2">
                      {visibleMovies.map((movie, index) => (
                        <div key={movie.id} className="relative">
                          <MovieCard data={movie} />
                          {index === 0 && startIndex  !== 0 && (
                            <button
                              className=" text-[#209dce] absolute -left-2 md:-left-9 top-10 sm:top-14 md:top-[80px] xl:top-40 lg:top-[90px] transform -translate-y-1/2 px-2 py-1 rounded"
                              onClick={handlePrev}
                            >
                              <IoIosArrowBack size={30} />
                            </button>
                          )}
                          {index === visibleMovies.length - 1 && showCarouselArrows && (
                            <button className="text-[#209dce] absolute -right-2 md:-right-9 top-10 sm:top-14 md:top-[80px] xl:top-40 lg:top-[90px] transform -translate-y-1/2 px-2 py-1 rounded" onClick={handleNext}>
                              <IoIosArrowForward size={30} />
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList;