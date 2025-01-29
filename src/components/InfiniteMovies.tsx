"use client";

import { fetcher } from "@/helpers/swr-fetcher";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Movies from "./Movies";
import { LoaderCircle } from "lucide-react";

const InfiniteMovies = () => {
  const { ref, inView } = useInView();

  // eslint-disable-next-line
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.movies.length) return null;
    return `/api/user/favorites?page=${pageIndex + 1}`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );

  const movies = data ? data.flatMap((page) => page.movies) : [];
  const isLoadingMore = isLoading || (size > 0 && data && !data[size - 1]);
  const isEmpty = data?.[0]?.movies?.length === 0;
  const hasMore = data?.at(-1)?.hasMore ?? false;
  const isReachingEnd = isEmpty || !hasMore;

  useEffect(() => {
    if (inView && !isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [inView, isReachingEnd, isLoadingMore, setSize, size]);

  if (error) {
    return (
      <div className="grid place-items-center">
        <p className="text-center text-xl font-bold sm:text-3xl">
          There was an error fetching your favorite movies.
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="grid place-items-center">
        <p className="text-center text-xl font-bold sm:text-3xl">
          You haven&apos;t favorited any movies yet!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Movies
        showFullDetails={false}
        showHeart
        movies={movies}
        isLoading={isLoading}
      />

      <div className="flex justify-center">
        {isLoadingMore && <LoaderCircle className="size-8 animate-spin" />}
      </div>

      <div ref={ref} className="h-1" />
    </div>
  );
};

export default InfiniteMovies;
