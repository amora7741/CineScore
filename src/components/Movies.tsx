"use client";

import { useSearchParams } from "next/navigation";
import PageRouter from "./PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Movies = () => {
  const searchParams = useSearchParams();
  const page = Math.max(
    1,
    Math.min(MAX_PAGES, Number(searchParams.get("page")) || 1),
  );

  const { data: movies, isLoading } = useSWR(
    `/api/movies?page=${page}`,
    fetcher,
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>Movies</h1>
        <p>Page: {page}</p>
      </div>
      <PageRouter page={page} />
    </>
  );
};

export default Movies;
