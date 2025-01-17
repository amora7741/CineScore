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
        priority
      />
      <div className="flex size-full flex-col items-center justify-center gap-10 bg-background/80 p-4 backdrop-blur-lg sm:justify-evenly sm:p-8">
        <div className="flex w-full flex-col items-center gap-8 sm:w-5/6 md:w-2/3 xl:w-1/2">
          <h1 className="text-center text-4xl font-bold sm:text-5xl lg:text-6xl">
            Your streaming guide for the most popular movies
          </h1>
          <p className="hidden text-center text-lg sm:flex">
            Discover top-rated trending movies and keep track of your favorites
            with CineScore.
          </p>
          <Button
            className="bg-red-600 p-6 px-12 text-white hover:bg-red-800"
            asChild
          >
            <Link href="/movies">Discover Movies</Link>
          </Button>
        </div>

        <p className="font-semibold italic">
          Powered by{" "}
          <span className="bg-gradient-to-r from-[#90cea1] to-[#01b4e4] bg-clip-text font-bold text-transparent">
            TMDB
          </span>
        </p>
      </div>
    </main>
  );
}
