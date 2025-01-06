import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

const PageRouter = () => {
  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: 10 }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              href={{ pathname: "movies", query: { page: index + 1 } }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default PageRouter;
