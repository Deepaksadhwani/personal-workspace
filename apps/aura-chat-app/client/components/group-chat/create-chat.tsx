"use client";

import { clearCache } from "@/app/actions/common";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CHAT_GROUP_ENDPOINT } from "@/lib/api-endpoint";
import {
  createChatSchema,
  type createChatType,
} from "@/schemas/group-chat-schema";
import type { CustomUser } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateChat({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatType>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      title: "",
      passcode: "",
    },
  });

  const onSubmit = async (payload: createChatType) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        CHAT_GROUP_ENDPOINT,
        {
          ...payload,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: user.token,
          },
        },
      );
      if (data.message) {
        clearCache("dashboard");
        setLoading(false);
        setOpen(false);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Create Group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create your new chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-500">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Enter chat passcode"
              {...register("passcode")}
            />
            <span className="text-red-500">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Chat"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
