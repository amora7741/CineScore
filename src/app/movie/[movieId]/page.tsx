import MovieBanner from "@/components/MovieBanner";
import {
  fetchMovieByID,
  // fetchMovieCredits
} from "@/helpers/fetch-movies";
import { ExpandedMovie, ExtraMovieInfo } from "@/types/Movie";
import { Star, Clock, Calendar, Globe } from "lucide-react";

const convertRuntime = (runtime: number): string => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const movieId = (await params).movieId;

  const movieData: ExpandedMovie = await fetchMovieByID(movieId);
  // const movieCredits: MovieCredits = await fetchMovieCredits(movieId);

  const extraInfo: ExtraMovieInfo[] = [
    {
      icon: Star,
      info: [movieData.vote_average?.toFixed(1), `(${movieData.vote_count})`],
    },
    {
      icon: Clock,
      info: [convertRuntime(movieData.runtime || 0)],
    },
    {
      icon: Calendar,
      info: [movieData.release_date || "N/A"],
    },
    {
      icon: Globe,
      info: [movieData.original_language?.toUpperCase() || "N/A"],
    },
  ];

  return (
    <main>
      <MovieBanner
        movieBackdropPath={movieData.backdrop_path}
        moviePosterPath={movieData.poster_path}
        movieTitle={movieData.title}
        movieGenres={movieData.genres}
        extraMovieInfo={extraInfo}
      />
    </main>
  );
};

export default MoviePage;
