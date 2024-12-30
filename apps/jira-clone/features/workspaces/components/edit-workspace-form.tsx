"use client";

import { DottedSeprator } from "@/components/dotted-seprator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useResetInviteCode } from "@/features/workspaces/api/use-reset-invite-code";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { updateWorkspaceSchema } from "@/features/workspaces/schemas";
import type { Workspace } from "@/features/workspaces/types";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Copy, CopyIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace;
}

export const EditWorkspaceForm = ({
  onCancel,
  initialValues,
}: EditWorkspaceFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleteWorkspace } =
    useDeleteWorkspace();
  const { mutate: resetInvideCode, isPending: isResettingInviteCode } =
    useResetInviteCode();
  const router = useRouter();

  const [DeleteDiealog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action can not be undone.",
    "destructive",
  );
  const [ResetDialog, confirmReset] = useConfirm(
    "Reset Invite Code",
    "This action will invalidate the invite code.",
    "destructive",
  );

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };
  const handleResetInviteCode = async () => {
    const ok = await confirmReset();
    if (!ok) return;
    resetInvideCode(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  };

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success("Invite link copied");
    });
  };

  return (
    <div className="flex flex-col  gap-y-4">
      <DeleteDiealog />
      <ResetDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7 gap-x-4 flex-row items-center space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id} `)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeprator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="Logo"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <div>
                            <Avatar className="size-[72px]">
                              <AvatarFallback>
                                <ImageIcon className="size-[36px] text-neutral-400" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p
                            className="text-sm text-muted-foreground
                        "
                          >
                            JPG, PNG, GIF, SVG, or JPEG. Max size of 1MB.
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            disabled={isPending}
                            onChange={handleImageChange}
                            ref={inputRef}
                            accept=".jpg, .png, .svg, .jpeg"
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              onClick={() => inputRef.current?.click()}
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeprator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  disabled={isPending}
                  onClick={onCancel}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7 ">
          <div className="flex flex-col ">
            <h3 className="font-bold ">Invite Members</h3>
            <p className="text-sm text-muted-foreground ">
              Use the invite link to add members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                  className="size-12"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeprator className="py-7 " />
            <Button
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isResettingInviteCode}
              onClick={handleResetInviteCode}
              size="sm"
              variant="destructive"
              type="button"
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7 ">
          <div className="flex flex-col ">
            <h3 className="font-bold ">Danger Zone</h3>
            <p className="text-sm text-muted-foreground ">
              Deleting a workspace is a irriversible action and will delete all
              associated data.
            </p>
            <DottedSeprator className="py-7 " />
            <Button
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isDeleteWorkspace}
              onClick={handleDelete}
              size="sm"
              variant="destructive"
              type="button"
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
