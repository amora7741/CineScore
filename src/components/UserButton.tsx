import { getServerAuthSession } from "@/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserButton = async () => {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="hidden text-lg sm:flex">
                {session.user.username}
              </span>
              <User className="!size-6 stroke-[3] sm:hidden" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" className="text-lg">
          <Link href="/login">
            <span className="hidden sm:flex">Sign In</span>
            <User className="!size-6 stroke-[3] sm:hidden" />
          </Link>
        </Button>
      )}
    </>
  );
};

export default UserButton;
