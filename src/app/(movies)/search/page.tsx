import { MAX_PAGES } from "@/lib/constants";
import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { SearchMovie } from "@/types/Movie";
import { fetchMoviesByQuery } from "@/helpers/fetch-movies";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { q: queryParam } = await searchParams;
  const { page: pageParam } = await searchParams;

  const movieQuery = decodeURIComponent(queryParam ?? "");
  const page = Math.max(1, Math.min(MAX_PAGES, Number(pageParam) || 1));

  const movieData: SearchMovie = await fetchMoviesByQuery(movieQuery, page);

  if (!movieQuery) {
    return (
      <p className="self-center justify-self-center text-center text-xl font-bold sm:text-3xl">
        No query provided!
      </p>
    );
  }

  return (
    <main className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[auto_1fr_auto] gap-6 p-4 py-8 sm:p-8">
      <p className="truncate px-2 text-lg sm:text-xl lg:text-2xl">
        Search results for <span className="font-bold">{movieQuery}</span>
      </p>

      <Movies movies={movieData.results} isLoading={false} />

      <PageRouter
        page={page}
        hrefPath="/search"
        maxPages={movieData.total_pages || 1}
        additionalQuery={{ q: movieQuery }}
      />
    </main>
  );
};

export default SearchPage;
