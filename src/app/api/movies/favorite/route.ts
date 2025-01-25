import { getServerAuthSession } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const searchParams = request.nextUrl.searchParams;

  const movieId = searchParams.get("movieId");

  try {
    const existingSession = await getServerAuthSession();

    if (!existingSession) {
      return NextResponse.json(
        { error: "You are not authorized.", favorited: false },
        { status: 401 },
      );
    }

    const user = await sql("SELECT * FROM users WHERE id = ($1) LIMIT 1;", [
      existingSession.user.id,
    ]);

    if (user.length === 0) {
      return NextResponse.json(
        { error: "User does not exist!", favorited: false },
        { status: 401 },
      );
    }

    const movieFavorited = await sql(
      "SELECT * FROM user_movie WHERE user_id = ($1) AND movie_id = ($2) LIMIT 1;",
      [existingSession.user.id, movieId],
    );

    return NextResponse.json({
      favorited: movieFavorited.length !== 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error, favorited: false });
  }
}

export async function POST(request: NextRequest) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  try {
    const {
      movieId,
      movieTitle,
      movieBackdropPath,
      moviePosterPath,
      movieOverview,
    } = await request.json();

    const existingSession = await getServerAuthSession();

    if (!existingSession) {
      return NextResponse.json(
        { error: "You are not authorized.", favorited: false },
        { status: 401 },
      );
    }

    const user = await sql("SELECT * FROM users WHERE id = ($1) LIMIT 1;", [
      existingSession.user.id,
    ]);

    if (user.length === 0) {
      return NextResponse.json(
        { error: "User does not exist!", favorited: false },
        { status: 401 },
      );
    }

    const movieFavorited = await sql(
      "SELECT * FROM user_movie WHERE user_id = ($1) AND movie_id = ($2) LIMIT 1;",
      [existingSession.user.id, movieId],
    );

    if (movieFavorited.length === 0) {
      await sql(
        `INSERT INTO movie (id, title, backdrop_path, poster_path, overview)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING;`,
        [
          movieId,
          movieTitle,
          movieBackdropPath,
          moviePosterPath,
          movieOverview,
        ],
      );

      await sql(
        `INSERT INTO user_movie (user_id, movie_id)
         VALUES ($1, $2);`,
        [existingSession.user.id, movieId],
      );

      return NextResponse.json({
        message: "Movie favorited.",
        favorited: true,
      });
    } else {
      await sql(
        `DELETE FROM user_movie WHERE user_id = ($1) AND movie_id = ($2);`,
        [existingSession.user.id, movieId],
      );

      return NextResponse.json({
        message: "Movie unfavorited.",
        favorited: false,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error, favorited: false });
  }
}
