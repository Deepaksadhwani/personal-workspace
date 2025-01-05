import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingPageProps {
  params: Promise<{ projectId: string }>;
}

const ProjectIdSettingPage = async ({ params }: ProjectIdSettingPageProps) => {
  const { projectId } = await params;
  const user = await getCurrent();
  if (!user) redirect("/sign-up");

  const initalValues = await getProject({ projectId });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initalValues} />
    </div>
  );
};

export default ProjectIdSettingPage;
