import { fetchMovies } from "@/helpers/fetch-movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;

    const movieData = await fetchMovies(page, "popular");

    return NextResponse.json(movieData);
  } catch (error) {
    return NextResponse.error();
  }
}
