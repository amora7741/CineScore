import { getServerAuthSession } from "@/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";

const UserButton = async () => {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <h1>User: ${session.user.username}</h1>
      ) : (
        <Button variant="ghost" className="text-lg">
          <Link href="/login">Sign In</Link>
        </Button>
      )}
    </>
  );
};

export default UserButton;
