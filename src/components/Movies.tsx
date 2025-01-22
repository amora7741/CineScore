import { Movie } from "@/types/Movie";
import { LoaderCircle, Star } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const Movies = ({
  movies,
  isLoading,
}: {
  movies: Movie[] | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="size-16 animate-spin" />
      </div>
    );
  }

  if (!movies) {
    return (
      <p className="self-center justify-self-center text-center text-xl font-bold sm:text-3xl">
        There was an error fetching the movies :&#40;
      </p>
    );
  }

  if (movies.length === 0) {
    return (
      <p className="self-center justify-self-center text-center text-xl font-bold sm:text-3xl">
        No results found!
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-y-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-6">
      {movies.map((movie) => (
        <Link
          href={`/movie/${movie.id}`}
          key={movie.id}
          className="flex max-h-fit cursor-pointer flex-col rounded-xl p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <div className="flex w-full flex-col gap-2">
            {movie.poster_path ? (
              <Image
                priority
                width={325}
                height={485}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title || ""}
                className="aspect-[2/3] w-full rounded-lg object-cover object-top"
              />
            ) : (
              <div className="grid aspect-[2/3] place-items-center rounded-lg bg-neutral-200">
                <span className="text-neutral-500 dark:text-neutral-400">
                  No image available
                </span>
              </div>
            )}

            <div className="flex flex-col">
              <h3 className="truncate text-left text-sm font-medium text-neutral-800 dark:text-neutral-200 sm:text-base lg:text-lg">
                {movie.title || "No title found."}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="size-3 fill-foreground sm:size-4" />
                <span className="text-xs sm:text-sm lg:text-base">
                  {movie.vote_average?.toFixed(1) || "--"}
                </span>
                <span className="text-xs sm:text-sm lg:text-base">
                  ({movie.vote_count})
                </span>
              </div>
              <p className="text-left text-xs sm:text-sm lg:text-base">
                {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No release date."}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default Movies;
