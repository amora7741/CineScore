import { getServerAuthSession } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 20;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;

  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json(
        { error: "You are not authorized." },
        { status: 401 },
      );
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    const movies = await sql(
      `
      SELECT m.* 
      FROM movie m
      JOIN user_movie um ON m.id = um.movie_id
      WHERE um.user_id = ($1)
      LIMIT ${ITEMS_PER_PAGE} 
      OFFSET ${offset};
    `,
      [session.user.id],
    );

    const totalCount = await sql(
      `SELECT COUNT(*) as count 
       FROM user_movie 
       WHERE user_id = ($1)`,
      [session.user.id],
    );

    return NextResponse.json({
      movies,
      hasMore: offset + ITEMS_PER_PAGE < totalCount[0].count,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
