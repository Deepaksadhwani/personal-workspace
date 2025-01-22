import { DottedSeprator } from "@/components/dotted-seprator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TaskActions } from "@/features/tasks/components/task-actions";
import { TaskDate } from "@/features/tasks/components/task-date";
import type { Task } from "@/features/tasks/types";
import { MoreHorizontal } from "lucide-react";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      <DottedSeprator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          fallbackClassName="text-[10px]"
          name={task.assignee.name}
        />
        <div className="size-1  rounded-full bg-neutral-300" />
        <TaskDate date={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallback="text-[10px]"
        />
        <span className="text-xs font-medium ">{task.project.name}</span>
      </div>
    </div>
  );
};
