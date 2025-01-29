import { LucideIcon } from "lucide-react";

type Movie = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

type SearchMovie = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type MovieList = SearchMovie & {
  dates?: {
    maximum: string;
    minimum: string;
  };
};

type ExpandedMovie = Movie & {
  belongs_to_collection?: string;
  budget?: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  imdb_id?: string;
  production_companies: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue?: number;
  runtime?: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string;
};

type ExtraMovieInfo = {
  icon: LucideIcon;
  info: (string | number | undefined)[];
};
