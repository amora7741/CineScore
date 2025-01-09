import { Button } from "./ui/button";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <Button variant="ghost">
      <Search className="!size-5 stroke-[3]" />
    </Button>
  );
};

export default SearchBar;
