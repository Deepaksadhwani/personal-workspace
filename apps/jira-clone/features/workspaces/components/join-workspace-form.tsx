"use client";

import { DottedSeprator } from "@/components/dotted-seprator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues: { name },
}: JoinWorkspaceFormProps) => {
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();
  const router = useRouter();
  const onSubmit = () => {
    mutate(
      { param: { workspaceId }, json: { code: inviteCode } },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none ">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription className="">
          You&apos;ve been invited to join <strong>{name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeprator />
      </div>
      <CardContent className="p-7">
        <div className="flex items-center flex-col gap-2 lg:flex-row justify-between">
          <Button
            size="lg"
            variant="secondary"
            type="button"
            asChild
            className="w-full lg:w-fit"
            disabled={isPending}
          >
            <Link href="/workspaces">Cancel</Link>
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isPending}
            size="lg"
            type="button"
            className="w-full lg:w-fit"
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
