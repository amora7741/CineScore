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
        {Array.from({ length: 4 }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink href={`/movies?page=${index + 1}`}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/movies?page=50">50</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={page < 50 ? `/movies?page=${page + 1}` : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageRouter;
