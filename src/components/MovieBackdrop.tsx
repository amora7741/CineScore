"use client";

import Image from "next/image";
import { useState } from "react";

const MovieBackdrop = ({
  movieBackdropPath,
}: {
  movieBackdropPath: string | undefined;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {movieBackdropPath ? (
        <Image
          priority
          fill
          src={`https://image.tmdb.org/t/p/original/${movieBackdropPath}`}
          alt="Backdrop movie image"
          className={`-z-50 object-cover opacity-0 transition-opacity ease-linear ${imageLoaded ? "opacity-100" : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        <div className="absolute -z-50 size-full bg-muted-foreground" />
      )}
    </>
  );
};

export default MovieBackdrop;
