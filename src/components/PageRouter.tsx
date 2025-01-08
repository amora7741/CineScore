import { MAX_PAGES } from "@/lib/constants";
import {
  Pagination,
  PaginationBeginning,
  PaginationContent,
  PaginationEllipsis,
  PaginationEnd,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PageRouter = ({ page }: { page: number }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationBeginning
            href={{
              pathname: "/movies",
              query: { page: 1 },
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname: "/movies",
              query: { page: page - 1 },
            }}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive
            href={{ pathname: "/movies", query: { page: page } }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={{
              pathname: "/movies",
              query: { page: page + 1 },
            }}
            className={
              page >= MAX_PAGES ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationEnd
            href={{
              pathname: "/movies",
              query: { page: MAX_PAGES },
            }}
            className={
              page === MAX_PAGES ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageRouter;
