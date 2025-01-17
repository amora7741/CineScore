import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SignOut = () => {
  return (
    <Dialog>
      <DialogTrigger>Sign Out</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>

          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>

        <Button>Sign Out</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignOut;
