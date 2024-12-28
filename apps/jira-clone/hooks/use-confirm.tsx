import { ResponsiveModal } from "@/components/responsive-modal";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type JSX, useState } from "react";

// this is a hook to trigger a confirmation modal or dialog every we need one.
export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "primary",
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const confirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0 ">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
            <div className="pt-4 w-full flex-col  flex items-center  justify-end gap-y-2 lg:flex-row gap-x-2 ">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full lg:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant={variant}
                className="w-full lg:w-auto"
              >
                Confirm
              </Button>
            </div>
          </CardHeader>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [confirmationDialog, confirm] as const;
};
