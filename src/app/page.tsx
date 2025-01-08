import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="my-48 flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-7xl font-bold">CineScore</h1>
        <p>Browse through the most popular movies!</p>
        <Button asChild>
          <Link href="/movies">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
