import { ExtraMovieInfo } from "@/types/Movie";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import BackButton from "./BackButton";
import MovieBackdrop from "./MovieBackdrop";

const MovieBanner = ({
  movieBackdropPath,
  moviePosterPath,
  movieTitle,
  movieGenres,
  extraMovieInfo,
  showBackButton = false,
}: {
  movieBackdropPath: string | undefined;
  moviePosterPath: string | undefined;
  movieTitle: string | undefined;
  movieGenres: { id: number; name: string }[];
  extraMovieInfo: ExtraMovieInfo[];
  showBackButton?: boolean;
}) => {
  return (
    <div className="relative min-h-[80vh]">
      <MovieBackdrop movieBackdropPath={movieBackdropPath} />

      {showBackButton && (
        <BackButton className="absolute left-4 top-4 md:left-8 md:top-8" />
      )}

      <div className="absolute inset-0 -z-40 bg-background/70" />

      <div className="absolute inset-0 -z-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex size-full max-w-screen-2xl items-center justify-center md:justify-start">
        <div className="flex flex-col items-center gap-8 p-4 sm:p-8 md:flex-row md:items-end">
          {moviePosterPath ? (
            <Image
              priority
              width={300}
              height={450}
              src={`https://image.tmdb.org/t/p/w500/${moviePosterPath}`}
              alt={`${movieTitle} backdrop image`}
              className="aspect-[2/3] w-[190px] rounded-lg sm:w-[200px] md:w-[250px]"
            />
          ) : (
            <div className="aspect-[2/3] w-[190px] rounded-lg bg-muted-foreground sm:w-[200px] md:w-[250px]" />
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
            <h1 className="line-clamp-3 text-center text-4xl font-bold !leading-tight sm:text-5xl md:text-start md:text-6xl">
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
