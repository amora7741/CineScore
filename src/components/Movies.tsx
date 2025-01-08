import axios from "axios";
import { LoaderCircle } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Movies = ({ page }: { page: number }) => {
  const { data: movies, isLoading } = useSWR<Movie[]>(
    `/api/movies?page=${page}`,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="size-16 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {movies ? (
        <div className="grid grid-cols-3 gap-4"></div>
      ) : (
        <p className="self-center justify-self-center text-center text-xl font-bold sm:text-3xl">
          There was an error fetching the movies :(
        </p>
      )}
    </>
  );
};

export default Movies;
