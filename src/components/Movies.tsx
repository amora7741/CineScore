"use client";

import { useSearchParams } from "next/navigation";
import PageRouter from "./PageRouter";
import { MAX_PAGES } from "@/lib/constants";

const Movies = () => {
  const searchParams = useSearchParams();
  const page = Math.max(
    1,
    Math.min(MAX_PAGES, Number(searchParams.get("page")) || 1),
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
