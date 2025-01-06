import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { fetchMovies } from "@/helpers/fetch-movies";

export default async function Home() {
  const movieData: Movie[] = await fetchMovies(1, "popular");

  return (
    <div>
      <h1>CineScore</h1>
      <Movies movies={movieData} />
      <PageRouter />
    </div>
  );
}
