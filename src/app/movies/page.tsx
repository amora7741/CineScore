"use client";

import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { fetcher } from "@/helpers/swr-fetcher";
import { Movie } from "@/types/Movie";

const MoviePageContent = () => {
  const searchParams = useSearchParams();
  const page = Math.max(
    1,
    Math.min(MAX_PAGES, Number(searchParams.get("page")) || 1),
  );

  const { data: movies, isLoading } = useSWR<Movie[]>(
    `/api/movies?page=${page}`,
    fetcher,
  );

  return (
    <main className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[1fr_auto] gap-2 p-4 sm:gap-4 sm:p-8 lg:gap-6">
      <Movies movies={movies} isLoading={isLoading} />
      <PageRouter page={page} maxPages={MAX_PAGES} hrefPath="/movies" />
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
