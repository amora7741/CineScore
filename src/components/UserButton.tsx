"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SessionProvider, useSession } from "next-auth/react";
import SignOut from "@/components/SignOut";

const UserButton = () => (
  <SessionProvider>
    <UserButtonContent />
  </SessionProvider>
);

const UserButtonContent = () => {
  const { data: session } = useSession();

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
              <DropdownMenuItem>
                <User />
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <LogOut />
                <SignOut />
              </DropdownMenuItem>
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
