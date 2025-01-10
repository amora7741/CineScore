"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [movieQuery, setMovieQuery] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Search className="!size-5 stroke-[3]" />
        </Button>
      </DialogTrigger>

      <DialogContent className="left-0 top-0 max-w-full translate-x-0 translate-y-0 border-none bg-transparent">
        <div className="mx-auto my-28 w-full max-w-screen-xl">
          <Input
            value={movieQuery}
            onChange={(e) => setMovieQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="rounded-none border-x-0 border-b-2 border-t-0 border-b-gray-500 bg-transparent py-8 text-2xl font-semibold focus-visible:border-b-black sm:text-3xl md:text-5xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
