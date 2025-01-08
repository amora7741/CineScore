"use client";

import Movies from "@/components/Movies";
import PageRouter from "@/components/PageRouter";
import { MAX_PAGES } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

const MoviesPage = () => {
  const searchParams = useSearchParams();
  const page = Math.max(
    1,
    Math.min(MAX_PAGES, Number(searchParams.get("page")) || 1),
  );

  return (
    <div className="relative grid grid-rows-[auto_1fr_auto] gap-4 py-4">
      <h1>Movies</h1>
      <Movies page={page} />
      <PageRouter page={page} />
    </div>
  );
};

export default MoviesPage;
