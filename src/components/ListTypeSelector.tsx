import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const movieLists: { value: ListType; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "now_playing", label: "Now Playing" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

const ListTypeSelector = ({ currentType }: { currentType: ListType }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-fit p-2 sm:px-4" variant="outline">
          <span className="hidden sm:flex">
            {movieLists.find((type) => type.value === currentType)?.label}
          </span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {movieLists.map((type) => (
          <DropdownMenuItem key={type.value}>
            <Link href={`/movies/${type.value}`}>{type.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListTypeSelector;
