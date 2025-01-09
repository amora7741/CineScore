"use client";

import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MoviesContent = () => {
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
    <main className="relative grid grid-rows-[1fr_auto] gap-8 p-4 py-8">
      <Movies movies={movies} isLoading={isLoading} />
      <PageRouter page={page} />
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
      <MoviesContent />
    </Suspense>
  );
};

export default MoviesPage;
