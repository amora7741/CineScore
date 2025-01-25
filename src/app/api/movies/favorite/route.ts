import { getServerAuthSession } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

const preparedStatements = {
  getUserAndFavoriteStatus: `
    SELECT 
      u.id as user_exists,
      (SELECT EXISTS(
        SELECT 1 FROM user_movie 
        WHERE user_id = ($1) AND movie_id = ($2)
      )) as is_favorited
    FROM users u 
    WHERE u.id = ($1) 
    LIMIT 1;
  `,

  createMovieInstance: `INSERT INTO movie (id, title, backdrop_path, poster_path, overview) 
  VALUES ($1, $2, $3, $4, $5) 
  ON CONFLICT (id) DO NOTHING;`,

  createUserMovieInstance: `INSERT INTO user_movie (user_id, movie_id)
         VALUES ($1, $2);`,

  removeUserMovieInstance: `DELETE FROM user_movie WHERE user_id = ($1) AND movie_id = ($2);`,
};

export async function GET(request: NextRequest) {
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

    const result = await sql(preparedStatements.getUserAndFavoriteStatus, [
      existingSession.user.id,
      movieId,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "User does not exist!", favorited: false },
        { status: 401 },
      );
    }

    return NextResponse.json({
      favorited: result[0].is_favorited,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error, favorited: false });
  }
}

export async function POST(request: NextRequest) {
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

    const result = await sql(preparedStatements.getUserAndFavoriteStatus, [
      existingSession.user.id,
      movieId,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "User does not exist!", favorited: false },
        { status: 401 },
      );
    }

    if (!result[0].is_favorited) {
      await sql.transaction((tx) => [
        tx(preparedStatements.createMovieInstance, [
          movieId,
          movieTitle,
          movieBackdropPath,
          moviePosterPath,
          movieOverview,
        ]),
        tx(preparedStatements.createUserMovieInstance, [
          existingSession.user.id,
          movieId,
        ]),
      ]);

      return NextResponse.json({
        message: "Movie favorited.",
        favorited: true,
      });
    } else {
      await sql(preparedStatements.removeUserMovieInstance, [
        existingSession.user.id,
        movieId,
      ]);

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
