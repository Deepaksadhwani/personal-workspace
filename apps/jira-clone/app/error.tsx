"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen gap-y-4 flex flex-col items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm  text-muted-foreground ">
        Something went wrong. Please try again later.
      </p>
      <Button variant="secondary" size="sm">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
