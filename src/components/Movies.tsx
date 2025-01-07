"use client";

import { useSearchParams } from "next/navigation";
import PageRouter from "./PageRouter";

const Movies = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || 1;

  const page = Math.max(1, Math.min(50, Number(pageParam)));

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
