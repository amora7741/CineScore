import { fetchMoviesByQuery } from "@/helpers/fetch-movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  try {
    const movieData = await fetchMoviesByQuery(query, page);

    return NextResponse.json(movieData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
