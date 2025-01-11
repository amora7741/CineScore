"use client";

import { useSearchParams } from "next/navigation";

import useSWR from "swr";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { fetcher } from "@/helpers/swr-fetcher";
import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";

const SearchPageContent = () => {
  const searchParams = useSearchParams();

  const movieQuery = decodeURIComponent(searchParams.get("q")!);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data: movieData, isLoading } = useSWR<SearchMovie>(
    `/api/movies/search?query=${movieQuery}&page=${page}`,
    fetcher,
  );

  console.log(movieData?.results);

  return (
    <main className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[auto_1fr_auto] gap-8 p-8">
      <p className="line-clamp-1 px-2 text-2xl">
        Search results for <span className="font-bold">{movieQuery}</span>
      </p>

      <Movies movies={movieData?.results} isLoading={isLoading} />

      <PageRouter page={page} />
    </main>
  );
};

const SearchPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <LoaderCircle className="size-16 animate-spin" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
