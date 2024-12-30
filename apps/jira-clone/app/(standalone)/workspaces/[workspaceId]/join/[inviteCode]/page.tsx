import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdJoinPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const { workspaceId } = await params;
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValue = await getWorkspaceInfo({ workspaceId });

  if (!initialValue) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValue} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
