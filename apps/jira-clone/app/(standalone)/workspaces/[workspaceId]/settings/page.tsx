import WorkspaceIdSettingsClient from "@/app/(standalone)/workspaces/[workspaceId]/settings/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const WorkspaceIdSettingPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingPage;
