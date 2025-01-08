import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="my-60 flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-7xl font-bold">CineScore</h1>
        <p className="max-w-md text-center text-lg">
          Discover and explore popular movies, create your personal favorites
          list, and keep track of films you love.
        </p>
        <Button asChild>
          <Link href="/movies">Start Browsing</Link>
        </Button>
      </div>
    </main>
  );
}
