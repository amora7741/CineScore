import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;

const options = {
  method: "get",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

type ListType = "now_playing" | "popular" | "top_rated" | "upcoming";

export const fetchMovies = async (page: number, listType: ListType) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${listType}?language=en-US&page=${page}`,
      options,
    );

    return data.results;
  } catch (error) {
    return `Error: ${error}`;
  }
};
