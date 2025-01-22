import { ProjectIdSettingsClient } from "@/app/(standalone)/workspaces/[workspaceId]/projects/[projectId]/settings/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const ProjectIdSettingPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-up");

  return <ProjectIdSettingsClient />;
};

export default ProjectIdSettingPage;
