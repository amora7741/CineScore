import {
  Pagination,
  PaginationBeginning,
  PaginationContent,
  PaginationEnd,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PageRouter = ({
  page,
  hrefPath,
  maxPages,
  additionalQuery = {},
}: {
  page: number;
  hrefPath: string;
  maxPages: number;
  additionalQuery?: Record<string, string>;
}) => {
  const getQueryParams = (pageNum: number) => ({
    ...additionalQuery,
    page: pageNum,
  });

  return (
    <Pagination className="-ml-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationBeginning
            href={{
              pathname: hrefPath,
              query: getQueryParams(1),
            }}
            className={page <= 1 ? "invisible" : "visible"}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={{
              pathname: hrefPath,
              query: getQueryParams(page - 1),
            }}
            className={page <= 1 ? "invisible" : "visible"}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive
            href={{ pathname: hrefPath, query: getQueryParams(page) }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={{
              pathname: hrefPath,
              query: getQueryParams(page + 1),
            }}
            className={page >= maxPages ? "invisible" : "visible"}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationEnd
            href={{
              pathname: hrefPath,
              query: getQueryParams(maxPages),
            }}
            className={page >= maxPages ? "invisible" : "visible"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageRouter;
