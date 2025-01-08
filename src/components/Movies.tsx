import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Movies = ({ page }: { page: number }) => {
  const { data: movies, isLoading } = useSWR(
    `/api/movies?page=${page}`,
    fetcher,
  );

  return (
    <div>
      <h1>[Movies go here]</h1>
    </div>
  );
};

export default Movies;
