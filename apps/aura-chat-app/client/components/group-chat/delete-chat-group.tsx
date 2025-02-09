import { clearCache } from "@/app/actions/common";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CHAT_GROUP_ENDPOINT } from "@/lib/api-endpoint";
import axios from "axios";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function DeleteChatGroup({
  open,
  setOpen,
  groupId,
  token,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: string;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const deleteChatGroup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${CHAT_GROUP_ENDPOINT}/${groupId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (data?.message) {
        clearCache("dashboard");
        toast.success(data?.message);
        setOpen(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Somethign went wrong.please try again later.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat
            group and its conversations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deleteChatGroup}>
            {loading ? "Processing.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
