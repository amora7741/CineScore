"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle, LogOut, User } from "lucide-react";
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
import { useEffect, useState } from "react";

const UserButton = () => (
  <SessionProvider>
    <UserButtonContent />
  </SessionProvider>
);

const UserButtonContent = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <Button variant="ghost" className="sm:w-24">
        <LoaderCircle className="!size-6 animate-spin" />
      </Button>
    );
  }

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="sm:w-24">
              <span className="hidden truncate text-lg sm:flex">
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
                <a href="/profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <LogOut />
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" className="text-lg sm:w-24">
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
