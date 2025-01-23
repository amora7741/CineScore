import Cast from "@/components/Cast";
import MovieBanner from "@/components/MovieBanner";
import MovieDetailSection from "@/components/MovieDetailSection";
import { fetchMovieByID, fetchMovieCredits } from "@/helpers/fetch-movies";
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

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;

  const [movieData, movieCredits]: [ExpandedMovie, MovieCredits] =
    await Promise.all([fetchMovieByID(movieId), fetchMovieCredits(movieId)]);

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

  return (
    <main className="flex flex-col">
      <MovieBanner
        movieBackdropPath={movieData.backdrop_path}
        moviePosterPath={movieData.poster_path}
        movieTitle={movieData.title}
        movieGenres={movieData.genres}
        extraMovieInfo={extraInfo}
        showBackButton
      />

      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 p-8 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8 overflow-hidden">
          <MovieDetailSection Icon={Info} header="Overview">
            <p className="sm:text-lg">
              {movieData.overview || "No overview found."}
            </p>
          </MovieDetailSection>

          <MovieDetailSection Icon={Video} header="Trailer">
            <h1>Bleh</h1>
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
