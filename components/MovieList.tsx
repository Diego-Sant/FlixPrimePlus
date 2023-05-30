import React, { useState } from "react";

import {isEmpty} from "lodash"

import MovieCard from "./MovieCard";

import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Define a primeira imagem como index 0

    // Carrosel para mover 1 index para frente
    const handleNext = () => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    };
  
    // Carrosel para mover 1 index para trás
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    if (isEmpty(data)) {
        return null;
    }

    const startIndex = Math.floor(currentIndex);
    const endIndex = Math.ceil(currentIndex + 3);
    const visibleMovies = data.slice(startIndex, endIndex);

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
                          {index === visibleMovies.length - 1 && endIndex < data.length && (
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