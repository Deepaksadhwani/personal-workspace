import { DottedSeprator } from "@/components/dotted-seprator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import type { Task } from "../types";
import OverviewProperty from "./overview-property";
import { TaskDate } from "./task-date";

interface TaskOverviewProps {
  task: Task;
}

const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { open } = useEditTaskModal();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button onClick={() => open(task.$id)} size="sm" variant="secondary">
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeprator className="my-4 " />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            {task.assignee.name}
          </OverviewProperty>
          <OverviewProperty label="due Date">
            <TaskDate date={task.dueDate} className="texsm font-medium " />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
