const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const movieId = (await params).movieId;

  return <main className="grid place-items-center">Movie ID: {movieId}</main>;
};

export default MoviePage;
