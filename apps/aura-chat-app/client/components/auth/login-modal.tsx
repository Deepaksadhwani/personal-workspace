import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginModal() {
  const handleLogin = async () => {
    signIn("google", { callbackUrl: "/dashboard", redirect: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Welcome to Aurachat</DialogTitle>
          <DialogDescription>
            AuraChat makes it effortless to create secure chat links and start
            conversations in seconds.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleLogin}>
          <Image
            src="/images/google.png"
            alt="google logo"
            className="mr-4"
            width={25}
            height={25}
          />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
