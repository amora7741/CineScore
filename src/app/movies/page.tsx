"use client";

import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MoviesPage = () => {
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
    <main className="relative grid grid-rows-[1fr_auto] gap-4 p-4">
      <Movies movies={movies} isLoading={isLoading} />
      <PageRouter page={page} />
    </main>
  );
};

export default MoviesPage;
