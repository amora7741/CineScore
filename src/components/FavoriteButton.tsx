"use client";

import { Heart, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const { data } = useSWR(`/api/movies/favorite?movieId=${movieId}`, fetcher);
  const [favorited, setFavorited] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setFavorited(data.favorited);
      setLoading(false);
    }
  }, [data]);

  const handleFavoriteToggle = async () => {
    try {
      const response = await axios.post("/api/movies/favorite", {
        movieId,
        movieTitle,
        movieBackdropPath,
        moviePosterPath,
        movieOverview,
      });

      setFavorited(response.data.favorited);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setFavorited(false);
    }
  };

  return (
    <Button
      className="px-8 sm:w-60 sm:self-center md:self-start"
      onClick={handleFavoriteToggle}
    >
      {loading ? (
        <LoaderCircle className="!size-6 animate-spin" />
      ) : (
        <>
          <Heart className="fill-background" />
          {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </>
      )}
    </Button>
  );
};

export default FavoriteButton;
