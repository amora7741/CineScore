import { MAX_PAGES } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
          <PaginationPrevious
            href={page > 1 ? `/movies?page=${page - 1}` : undefined}
          />
        </PaginationItem>
        {Array.from({ length: Math.min(4, MAX_PAGES - page) }, (_, index) => (
          <PaginationItem key={page + index}>
            <PaginationLink
              isActive={index === 0}
              href={`/movies?page=${page + index}`}
            >
              {page + index}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < 46 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive={page === MAX_PAGES}
            href={`/movies?page=${MAX_PAGES}`}
          >
            {MAX_PAGES}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={page < MAX_PAGES ? `/movies?page=${page + 1}` : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageRouter;
