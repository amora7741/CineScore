import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Image from "next/image";

const Cast = ({ cast }: { cast: CastMember[] }) => {
  if (cast.length === 0) {
    return <p>No Cast Found!</p>;
  }

  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {cast.map((castMember) => (
          <CarouselItem key={castMember.id} className="basis-auto">
            <div className="relative flex aspect-[2/3] w-[190px] flex-col sm:w-[200px] md:w-[250px]">
              {castMember.profile_path ? (
                <Image
                  priority
                  width={300}
                  height={450}
                  src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
                  alt={`${castMember.name}  image`}
                  className="-z-50 rounded-lg object-cover"
                />
              ) : (
                <div className="grid size-full place-items-center rounded-lg bg-muted">
                  <span>No Image Found</span>
                </div>
              )}

              <div className="absolute inset-0 -z-40 bg-gradient-to-t from-background to-transparent" />

              <div className="absolute bottom-0 flex flex-col p-2">
                <span className="line-clamp-3 font-bold">
                  {castMember.character}
                </span>
                <span className="line-clamp-2">{castMember.name}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Cast;
