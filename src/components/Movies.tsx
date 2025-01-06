const Movies = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-5 gap-8">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="flex h-44 flex-col items-center justify-between rounded-lg bg-blue-500/10 p-4"
        >
          <h1 className="text-center">
            {movie.title ? movie.title : "No title found."}
          </h1>
          <span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "No"} Rating
          </span>
        </div>
      ))}
    </div>
  );
};

export default Movies;
