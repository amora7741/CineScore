"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SearchBar = () => {
  const router = useRouter();
  const [movieQuery, setMovieQuery] = useState<string>("");
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!movieQuery.trim()) return;

    const encodedQuery = encodeURIComponent(movieQuery.trim());

    startTransition(() => {
      router.push(`/search?q=${encodedQuery}`);

      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Search className="!size-5 stroke-[3]" />
        </Button>
      </DialogTrigger>

      <DialogContent
        isSearchDialog
        className="left-0 top-0 max-w-full translate-x-0 translate-y-0 border-none bg-transparent"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">Search for a movie</DialogTitle>
          <DialogDescription className="sr-only">
            Make a query here. Hit enter or the search button when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto my-10 w-full max-w-screen-xl sm:my-14 md:my-20">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Label
              className={`px-3 text-muted-foreground sm:text-lg md:px-4 md:text-xl ${movieQuery ? "flex" : "invisible"}`}
              htmlFor="query"
            >
              Search for a movie...
            </Label>
            <div className="relative">
              <Input
                type="search"
                id="query"
                value={movieQuery}
                onChange={(e) => setMovieQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="rounded-none border-x-0 border-b-2 border-t-0 border-b-gray-500 bg-transparent py-8 text-2xl font-semibold focus-visible:border-b-black dark:focus-visible:border-b-white sm:text-3xl md:text-5xl"
              />
              <Button
                disabled={isLoading}
                className="absolute right-0 top-1/4"
                variant="ghost"
                type="submit"
              >
                {isLoading ? (
                  <LoaderCircle className="!size-6 animate-spin stroke-[3]" />
                ) : (
                  <Search className="!size-6 stroke-[3]" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
