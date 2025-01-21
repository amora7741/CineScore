import { ExtraMovieInfo } from "@/types/Movie";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

const MovieBanner = ({
  movieBackdropPath,
  moviePosterPath,
  movieTitle,
  movieGenres,
  extraMovieInfo,
}: {
  movieBackdropPath: string | undefined;
  moviePosterPath: string | undefined;
  movieTitle: string | undefined;
  movieGenres: { id: number; name: string }[];
  extraMovieInfo: ExtraMovieInfo[];
}) => {
  return (
    <div className="relative">
      {movieBackdropPath ? (
        <Image
          priority
          fill
          src={`https://image.tmdb.org/t/p/original/${movieBackdropPath}`}
          alt={`${movieTitle} backdrop image`}
          className="-z-50 object-cover [mask:linear-gradient(to_bottom,background,background,transparent)]"
        />
      ) : (
        <div className="absolute -z-50 size-full bg-background" />
      )}

      <div className="absolute inset-0 -z-40 bg-background/70" />

      <div className="mx-auto flex h-full max-w-screen-2xl flex-col items-center gap-8 p-8 md:flex-row md:items-end">
        {moviePosterPath ? (
          <Image
            priority
            width={300}
            height={0}
            src={`https://image.tmdb.org/t/p/w500/${moviePosterPath}`}
            alt={`${movieTitle} backdrop image`}
            className="mt-10 w-[190px] rounded-lg sm:w-[200px] md:mt-20 md:w-[250px]"
          />
        ) : (
          <div className="mt-10 aspect-[2/3] w-[190px] rounded-lg bg-muted sm:w-[200px] md:w-[250px]" />
        )}

        <div className="flex w-full max-w-4xl flex-col gap-6">
          {movieGenres.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
              {movieGenres.map((genre) => (
                <li
                  key={genre.id}
                  className="rounded-full bg-muted/50 px-4 py-1 text-sm sm:text-base"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}

          <h1 className="order-first line-clamp-3 text-center text-4xl font-bold !leading-tight sm:text-5xl md:order-none md:text-start md:text-6xl">
            {movieTitle}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 gap-y-2 sm:gap-6 md:justify-start">
            {extraMovieInfo.map((info, i) => (
              <ExtraInfoDisplay key={i} info={info} />
            ))}
          </div>

          <Button className="px-8 sm:w-fit sm:self-center md:self-start">
            <Heart className="fill-background" />
            Add to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

const ExtraInfoDisplay = ({ info }: { info: ExtraMovieInfo }) => (
  <div className="flex items-center gap-1">
    <div className="rounded-full bg-muted/50 p-1">
      <info.icon className="size-4" />
    </div>

    {info.info.map((text, i) => (
      <span key={i} className="text-sm sm:text-base">
        {text}
      </span>
    ))}
  </div>
);

export default MovieBanner;
