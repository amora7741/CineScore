import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3/movie";

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
      `${BASE_URL}/${listType}?language=en-US&page=${page}`,
      options,
    );

    return data.results;
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const fetchMoviesByQuery = async (query: string, page: number) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
      options,
    );

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const fetchMovieByID = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${id}?language=en-US`,
      options,
    );

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const fetchMovieCredits = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${id}/credits?language=en-US`,
      options,
    );

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
};

export const fetchMovieVideos = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${id}/videos?language=en-US`,
      options,
    );

    return data;
  } catch (error) {
    return `Error: ${error}`;
  }
};
