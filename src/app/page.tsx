import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>CineScore</h1>
      <Button asChild variant="ghost">
        <Link href="/movies">Get Started</Link>
      </Button>
    </div>
  );
}
