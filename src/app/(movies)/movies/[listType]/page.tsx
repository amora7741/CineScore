"use client";

import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import { usePathname, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { fetcher } from "@/helpers/swr-fetcher";
import { MovieList } from "@/types/Movie";
import { isOfTypeListType } from "@/helpers/check-type";
import ListTypeSelector from "@/components/ListTypeSelector";

const MoviePageContent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const listParam = pathname.split("/")[2] || "";
  const listType: ListType = isOfTypeListType(listParam)
    ? listParam
    : "popular";

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data: movieData, isLoading } = useSWR<MovieList>(
    `/api/movies?listType=${listType}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      keepPreviousData: true,
      refreshInterval: 300000,
    },
  );

  const maxPages = Math.min(movieData?.total_pages || MAX_PAGES, MAX_PAGES);

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

      <Movies movies={movieData?.results} isLoading={isLoading} />

      <PageRouter
        page={page}
        maxPages={maxPages}
        hrefPath={`/movies/${listType}`}
      />
    </main>
  );
};

const MoviesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <LoaderCircle className="size-16 animate-spin" />
        </div>
      }
    >
      <MoviePageContent />
    </Suspense>
  );
};

export default MoviesPage;
