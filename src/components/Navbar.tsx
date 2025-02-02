import { Popcorn } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import UserButton from "@/components/UserButton";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between bg-background/50 p-4 shadow-sm backdrop-blur-xl sm:px-8">
      <Link href="/" className="flex items-center">
        <Popcorn className="size-8 -rotate-12 text-red-500" />
        <h1 className="hidden text-3xl font-bold sm:flex">CineScore</h1>
      </Link>

      <div className="flex items-center">
        <SearchBar />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
