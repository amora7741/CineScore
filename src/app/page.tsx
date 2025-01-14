import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="relative overflow-hidden">
      <Image
        src="/movies.png"
        alt="Background image"
        fill
        className="absolute -z-50 scale-105 object-cover"
      />
      <div className="grid size-full place-items-center bg-background/80 backdrop-blur-lg">
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
      </div>
    </main>
  );
}
