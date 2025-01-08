import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-background/5 p-4 shadow-sm backdrop-blur-xl">
      <h1 className="text-3xl font-bold">CineScore</h1>
      <Button variant="ghost" className="text-lg">
        Sign In
      </Button>
    </nav>
  );
};

export default Navbar;
