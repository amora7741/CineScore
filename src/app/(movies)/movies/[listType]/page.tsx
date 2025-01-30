import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import { isOfTypeListType } from "@/helpers/check-type";
import ListTypeSelector from "@/components/ListTypeSelector";
import { fetchMovies } from "@/helpers/fetch-movies";
import { MovieList } from "@/types/Movie";

export async function generateMetadata({
  params,
}: {
  params: { listType: string };
}) {
  const { listType: listParam } = params;

  const listType: ListType = isOfTypeListType(listParam)
    ? listParam
    : "popular";

  const title = `${
    listType === "now_playing"
      ? "Now Playing"
      : listType === "top_rated"
        ? "Top Rated"
        : listType.charAt(0).toUpperCase() + listType.slice(1)
  } Movies - CineScore`;

  return {
    title,
  };
}

const MoviesPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ listType: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { listType: listParam } = await params;
  const { page: pageParam } = await searchParams;

  const listType: ListType = isOfTypeListType(listParam)
    ? listParam
    : "popular";

  const page = Math.max(1, Math.min(MAX_PAGES, Number(pageParam) || 1));

  const movieData: MovieList = await fetchMovies(page, listType);

  const maxPages = Math.min(movieData.total_pages || MAX_PAGES, MAX_PAGES);

  return (
    <main className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[auto_1fr_auto] gap-6 p-4 py-8 sm:p-8">
      <div className="flex items-center justify-between px-2">
        <h1 className="border-l-2 px-2 text-lg font-bold sm:text-xl lg:text-2xl">
          {listType === "now_playing"
            ? "Now Playing"
            : listType === "top_rated"
              ? "Top Rated"
              : listType.charAt(0).toUpperCase() + listType.slice(1)}
        </h1>

        <ListTypeSelector currentType={listType} />
      </div>

      <Movies movies={movieData.results} isLoading={false} />

      <PageRouter
        page={page}
        maxPages={maxPages}
        hrefPath={`/movies/${listType}`}
      />
    </main>
  );
};

export default MoviesPage;
