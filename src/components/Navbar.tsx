import { Popcorn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between bg-background/50 p-4 shadow-sm backdrop-blur-xl">
      <Link href="/" className="flex items-center">
        <Popcorn className="size-8 -rotate-12 text-red-500" />
        <h1 className="hidden text-3xl font-bold sm:flex">CineScore</h1>
      </Link>
      <Button variant="ghost" className="text-lg">
        Sign In
      </Button>
    </nav>
  );
};

export default Navbar;
