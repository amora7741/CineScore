import Cast from "@/components/Cast";
import MovieBanner from "@/components/MovieBanner";
import MovieDetailSection from "@/components/MovieDetailSection";
import {
  fetchMovieByID,
  fetchMovieCredits,
  fetchMovieVideos,
} from "@/helpers/fetch-movies";
import { getServerAuthSession } from "@/lib/auth";
import { ExpandedMovie, ExtraMovieInfo } from "@/types/Movie";
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Info,
  Video,
  Users,
  NotepadText,
} from "lucide-react";

const convertRuntime = (runtime: number): string => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const formatCurrency = (value?: number) =>
  value ? `$${value.toLocaleString()}` : "N/A";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;

  const [movieData, movieCredits]: [ExpandedMovie, MovieCredits] =
    await Promise.all([fetchMovieByID(movieId), fetchMovieCredits(movieId)]);

  if (!movieData.id) {
    return {
      title: "Movie Not Found - CineScore",
      description: "The requested movie could not be found.",
    };
  }

  const directors = movieCredits.crew
    .filter((person: CrewMember) => person.job === "Director")
    .map((director) => director.name)
    .join(", ");

  const releaseYear = movieData.release_date
    ? new Date(movieData.release_date).getFullYear()
    : undefined;

  const genreNames = movieData.genres?.map((genre) => genre.name) || [];

  return {
    title: movieData.title
      ? `${movieData.title}${releaseYear ? ` (${releaseYear})` : ""} - CineScore`
      : "Movie Details - CineScore",
    description: movieData.overview || undefined,
    keywords: [
      "movie",
      "film",
      "cinema",
      movieData.title,
      ...genreNames,
      directors,
      releaseYear?.toString(),
    ].filter((keyword): keyword is string => Boolean(keyword)),
    openGraph: {
      title: movieData.title || "Movie Details",
      description: movieData.overview || undefined,
      type: "website",
      images: movieData.poster_path
        ? [
            {
              url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
              width: 500,
              height: 750,
              alt: `${movieData.title} poster`,
            },
          ]
        : undefined,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: movieData.title || "Movie Details",
      description: movieData.overview || undefined,
      images: movieData.poster_path
        ? [`https://image.tmdb.org/t/p/w500${movieData.poster_path}`]
        : undefined,
    },
    alternates: {
      canonical: `/movie/${movieId}`,
    },
  };
}

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  const session = await getServerAuthSession();

  const [movieData, movieCredits, movieVideos]: [
    ExpandedMovie,
    MovieCredits,
    MovieVideos,
  ] = await Promise.all([
    fetchMovieByID(movieId),
    fetchMovieCredits(movieId),
    fetchMovieVideos(movieId),
  ]);

  if (!movieData.id) {
    return (
      <div className="grid place-items-center p-4 sm:p-8">
        <h1 className="text-center text-xl font-bold sm:text-3xl">
          The movie you are looking for does not exist or was removed.
        </h1>
      </div>
    );
  }

  const extraInfo: ExtraMovieInfo[] = [
    {
      icon: Star,
      info: [movieData.vote_average?.toFixed(1), `(${movieData.vote_count})`],
    },
    {
      icon: Clock,
      info: [convertRuntime(movieData.runtime || 0)],
    },
    {
      icon: Calendar,
      info: [movieData.release_date || "N/A"],
    },
    {
      icon: Globe,
      info: [movieData.original_language?.toUpperCase() || "N/A"],
    },
  ];

  const movieDetails = [
    {
      label: "Status",
      info: movieData.status,
      renderCondition: !!movieData.status,
    },
    {
      label: "Budget",
      info: formatCurrency(movieData.budget),
      renderCondition: movieData.budget && movieData.budget > 0,
    },
    {
      label: "Revenue",
      info: formatCurrency(movieData.revenue),
      renderCondition: movieData.revenue && movieData.revenue > 0,
    },
    {
      label: "Production Companies",
      info: movieData.production_companies
        .map((company) => company.name)
        .join(", "),
      renderCondition: movieData.production_companies.length > 0,
    },
    {
      label: "Tagline",
      info: `"${movieData.tagline}"`,
      renderCondition: !!movieData.tagline,
    },
  ];

  const trailerVideo = movieVideos.results
    .filter(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official,
    )
    .sort(
      (a, b) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime(),
    )[0];

  return (
    <main className="flex flex-col">
      <MovieBanner
        movieBackdropPath={movieData.backdrop_path}
        moviePosterPath={movieData.poster_path}
        movieId={movieData.id}
        movieTitle={movieData.title}
        movieGenres={movieData.genres}
        extraMovieInfo={extraInfo}
        sessionUser={session?.user.username}
        showBackButton
      />

      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 p-4 sm:p-8 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8 overflow-hidden">
          <MovieDetailSection Icon={Info} header="Overview">
            <p className="sm:text-lg">
              {movieData.overview || "No overview found."}
            </p>
          </MovieDetailSection>

          <MovieDetailSection Icon={Video} header="Trailer">
            {trailerVideo ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                title={trailerVideo.name}
                allowFullScreen
                className="aspect-video w-full rounded-lg"
              />
            ) : (
              <p>No trailer available.</p>
            )}
          </MovieDetailSection>

          <MovieDetailSection Icon={Users} header="Cast">
            <Cast cast={movieCredits.cast} />
          </MovieDetailSection>
        </div>

        <MovieDetailSection Icon={NotepadText} header="Details">
          <dl className="space-y-4">
            {movieDetails
              .filter((detail) => detail.renderCondition)
              .map((detail, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <dt className="text-sm text-muted-foreground">
                    {detail.label}
                  </dt>

                  <dd className="font-semibold">{detail.info}</dd>
                </div>
              ))}
          </dl>
        </MovieDetailSection>
      </div>
    </main>
  );
};

export default MoviePage;
