"use client";

import { useSearchParams } from "next/navigation";

import useSWR from "swr";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { fetcher } from "@/helpers/swr-fetcher";

const SearchPageContent = () => {
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
