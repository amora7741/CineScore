import { fetchMovieByID, fetchMovieCredits } from "@/helpers/fetch-movies";

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const movieId = (await params).movieId;

  const movieData: ExpandedMovie = await fetchMovieByID(movieId);
  const movieCredits: MovieCredits = await fetchMovieCredits(movieId);

  console.log(movieData.title);
  console.log(movieCredits.cast);

  return <main className="grid place-items-center">Movie ID: {movieId}</main>;
};

export default MoviePage;
