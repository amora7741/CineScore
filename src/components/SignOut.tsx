import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while signing out.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Sign Out</DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl">Sign Out</DialogTitle>

          <DialogDescription className="text-lg">
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>

        <Button className="w-full sm:ml-auto sm:w-fit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignOut;
