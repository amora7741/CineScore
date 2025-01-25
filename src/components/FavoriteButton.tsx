"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/helpers/swr-fetcher";

const FavoriteButton = ({
  movieId,
  movieTitle,
  movieBackdropPath,
  moviePosterPath,
  movieOverview,
}: {
  movieId: number | undefined;
  movieTitle: string | undefined;
  movieBackdropPath: string | undefined;
  moviePosterPath: string | undefined;
  movieOverview: string | undefined;
}) => {
  const { data, isLoading, mutate } = useSWR(
    `/api/movies/favorite?movieId=${movieId}`,
    fetcher,
  );

  const handleFavoriteToggle = async () => {
    try {
      await mutate({ favorited: !data?.favorited }, false);

      const response = await axios.post("/api/movies/favorite", {
        movieId,
        movieTitle,
        movieBackdropPath,
        moviePosterPath,
        movieOverview,
      });

      mutate({ favorited: response.data.favorited });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      mutate();
    }
  };

  return (
    <Button
      className="px-8 transition-opacity sm:w-60 sm:self-center md:self-start"
      onClick={handleFavoriteToggle}
      disabled={isLoading}
    >
      <Heart className="fill-background" />
      {data?.favorited ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
};

export default FavoriteButton;
