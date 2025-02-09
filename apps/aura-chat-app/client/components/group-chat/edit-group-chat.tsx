"use client";
import React, {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createChatSchema,
  type createChatType,
} from "@/schemas/group-chat-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { clearCache } from "@/app/actions/common";
import { CHAT_GROUP_ENDPOINT } from "@/lib/api-endpoint";
import type { ChatGroupType, CustomUser } from "@/types/global";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function EditGroupChat({
  user,
  group,
  open,
  setOpen,
}: {
  user: CustomUser;
  group: ChatGroupType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createChatType>({
    resolver: zodResolver(createChatSchema),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setValue("title", group.title);
    setValue("passcode", group.passcode);
  }, [group]);

  const onSubmit = async (payload: createChatType) => {
    // console.log("The payload is", payload);
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${CHAT_GROUP_ENDPOINT}/${group.id}`,
        payload,
        {
          headers: {
            Authorization: user.token,
          },
        },
      );

      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
        clearCache("dashboard");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
