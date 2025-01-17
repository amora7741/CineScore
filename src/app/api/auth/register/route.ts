import { signupSchema } from "@/lib/validation/credentials";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  try {
    const body = await request.json();

    const { username: parsedUsername, password: parsedPassword } =
      signupSchema.parse({
        username: body.username,
        password: body.password,
        confirmPassword: body.password,
      });

    const existingUser = await sql(
      "SELECT * FROM users WHERE username = ($1) LIMIT 1;",
      [parsedUsername],
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Username already exists." },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(parsedPassword, 10);

    await sql("INSERT INTO users (username, password) VALUES ($1, $2)", [
      parsedUsername,
      hashedPassword,
    ]);

    return NextResponse.json({ message: "Account created." }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error occurred while signing up. More info in console." },
      { status: 400 },
    );
  }
}
