import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMedia } from "react-use";

interface ResponseModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: ResponseModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh] ">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
      <DrawerContent>
        <div className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh] ">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
