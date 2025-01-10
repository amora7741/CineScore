"use client";

import { LoaderCircle, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

import Image from "next/image";

const Movies = ({
  movies,
  isLoading,
}: {
  movies: Movie[] | undefined;
  isLoading: boolean;
}) => {
  const [active, setActive] = useState<Movie | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="size-16 animate-spin" />
      </div>
    );
  }

  if (!movies) {
    return (
      <p className="self-center justify-self-center text-center text-xl font-bold sm:text-3xl">
        There was an error fetching the movies :(
      </p>
    );
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 size-full bg-white/80 backdrop-blur-lg"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="absolute right-2 top-2 flex size-16 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <X />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="flex size-full max-w-[500px] flex-col overflow-hidden bg-white shadow-lg dark:bg-neutral-900 sm:rounded-xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <Image
                  width={500}
                  height={750}
                  src={`https://image.tmdb.org/t/p/w500${active.poster_path}`}
                  alt={active.title || ""}
                  className="h-80 w-full object-cover object-top sm:rounded-t-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`release-${active.id}-${id}`}
                      className="text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {active.release_date}
                    </motion.p>
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    {active.vote_average?.toFixed(1)}
                  </motion.div>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base"
                  >
                    {active.overview}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="mx-auto grid w-full max-w-screen-2xl grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <motion.button
            layoutId={`card-${movie.id}-${id}`}
            key={movie.id}
            onClick={() => setActive(movie)}
            className="flex cursor-pointer flex-col rounded-xl p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <div className="flex w-full flex-col gap-2">
              <motion.div layoutId={`image-${movie.id}-${id}`}>
                <Image
                  priority
                  width={325}
                  height={485}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || ""}
                  className="aspect-[2/3] w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.h3
                  layoutId={`title-${movie.id}-${id}`}
                  className="line-clamp-1 text-left text-lg font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {movie.title || "No title found."}
                </motion.h3>
                <div className="flex items-center gap-1">
                  <Star className="size-4" fill="black" />
                  <span>{movie.vote_average?.toFixed(1) || "--"}</span>
                  <span>({movie.vote_count || "-"})</span>
                </div>
                <p className="text-left">
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No release date."}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </ul>
    </>
  );
};

export default Movies;
