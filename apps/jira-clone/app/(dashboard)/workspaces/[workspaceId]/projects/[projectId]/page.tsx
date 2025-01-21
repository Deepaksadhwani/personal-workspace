import { ProjectIdClient } from "@/app/(dashboard)/workspaces/[workspaceId]/projects/[projectId]/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-up");

  return <ProjectIdClient />;
};

export default ProjectIdPage;
