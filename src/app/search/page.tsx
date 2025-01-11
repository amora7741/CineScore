"use client";

import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const movieQuery = decodeURIComponent(searchParams.get("q")!);

  return (
    <main className="relative grid grid-rows-[auto_1fr_auto] gap-8 p-8">
      <p className="line-clamp-1 text-xl">
        Search results for: <span className="font-bold">{movieQuery}</span>
      </p>
    </main>
  );
};

export default SearchPage;
