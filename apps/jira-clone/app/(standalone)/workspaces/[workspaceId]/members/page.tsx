import { getCurrent } from "@/features/auth/queries";
import { MembersList } from "@/features/workspaces/components/members-list";
import { redirect } from "next/navigation";

const WorkspaceIdMemberPage = () => {
  const user = getCurrent();
  if (!user) return redirect("/sign-in");

  return <MembersList />;
};

export default WorkspaceIdMemberPage;
