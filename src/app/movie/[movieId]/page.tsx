import MovieBanner from "@/components/MovieBanner";
import MovieDetailSection from "@/components/MovieDetailSection";
import {
  fetchMovieByID,
  // fetchMovieCredits
} from "@/helpers/fetch-movies";
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

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const movieId = (await params).movieId;

  const movieData: ExpandedMovie = await fetchMovieByID(movieId);
  // const movieCredits: MovieCredits = await fetchMovieCredits(movieId);

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
      infoIsString: true,
    },
    {
      label: "Budget",
      info: `$${movieData.budget?.toLocaleString()}`,
      infoIsString: true,
    },
    {
      label: "Revenue",
      info: `$${movieData.revenue?.toLocaleString()}`,
      infoIsString: true,
    },
    {
      label: "Production Companies",
      info: (
        <dd>
          {movieData.production_companies.map((company, i) => (
            <span key={i}>
              {company.name}
              {i < movieData.production_companies.length - 1 ? ", " : ""}
            </span>
          ))}
        </dd>
      ),
      infoIsString: false,
    },
    {
      label: "Tagline",
      info: (
        <dd className="font-semibold">
          &quot;{movieData.tagline || "N/A"}&quot;
        </dd>
      ),
      infoIsString: false,
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
      />

      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 p-8 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8">
          <MovieDetailSection Icon={Info} header="Overview">
            <p className="text-lg">{movieData.overview}</p>
          </MovieDetailSection>

          <MovieDetailSection Icon={Video} header="Trailer">
            <h1>Bleh</h1>
          </MovieDetailSection>

          <MovieDetailSection Icon={Users} header="Cast">
            <h1>Bleh</h1>
          </MovieDetailSection>
        </div>

        <MovieDetailSection Icon={NotepadText} header="Details">
          <dl className="space-y-4">
            {movieDetails.map((detail, i) => (
              <div key={i} className="flex flex-col gap-2">
                <dt className="text-sm text-muted-foreground">
                  {detail.label}
                </dt>
                {detail.infoIsString ? (
                  <dd className="font-semibold">{detail.info}</dd>
                ) : (
                  <>{detail.info}</>
                )}
              </div>
            ))}
          </dl>
        </MovieDetailSection>
      </div>
    </main>
  );
};

export default MoviePage;
