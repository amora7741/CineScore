import { isOfTypeListType } from "@/helpers/check-type";
import { fetchMovies } from "@/helpers/fetch-movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || 1;
  const listParam = searchParams.get("listType") || "";

  const listType: ListType = isOfTypeListType(listParam)
    ? listParam
    : "popular";

  try {
    const movieData = await fetchMovies(page, listType);

    return NextResponse.json(movieData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
