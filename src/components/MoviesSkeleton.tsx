import { Skeleton } from "./ui/skeleton";

const MoviesSkeleton = () => {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-y-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-y-6">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="flex flex-col gap-2 p-2">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />

          <div className="flex flex-col">
            <Skeleton className="h-5 w-full rounded-none sm:h-6 lg:h-7" />
            <Skeleton className="h-4 w-full rounded-none sm:h-5 lg:h-6" />
            <Skeleton className="h-4 w-full rounded-none sm:h-5 lg:h-6" />
          </div>
        </div>
      ))}
    </ul>
  );
};

export default MoviesSkeleton;
