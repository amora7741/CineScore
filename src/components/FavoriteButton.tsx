"use client";

import { Heart, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/helpers/swr-fetcher";
import { useToast } from "@/hooks/use-toast";

const FavoriteButton = ({
  movieId,
  movieTitle,
  moviePosterPath,
}: {
  movieId: number | undefined;
  movieTitle: string | undefined;
  moviePosterPath: string | undefined;
}) => {
  const { data, isLoading, mutate } = useSWR(
    `/api/movies/favorite?movieId=${movieId}`,
    fetcher,
  );
  const { toast } = useToast();

  const handleFavoriteToggle = async () => {
    try {
      await mutate({ favorited: !data?.favorited }, false);

      const response = await axios.post("/api/movies/favorite", {
        movieId,
        movieTitle,
        moviePosterPath,
      });

      mutate({ favorited: response.data.favorited });

      toast({
        title: response.data.favorited
          ? `${movieTitle} added to favorites.`
          : `${movieTitle} removed from favorites.`,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
      mutate();
    }
  };

  return (
    <Button
      className="px-8 transition-opacity sm:w-60 sm:self-center md:self-start"
      onClick={handleFavoriteToggle}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <Heart className="fill-background" />
          {data?.favorited ? "Remove from Favorites" : "Add to Favorites"}
        </>
      )}
    </Button>
  );
};

export default FavoriteButton;
