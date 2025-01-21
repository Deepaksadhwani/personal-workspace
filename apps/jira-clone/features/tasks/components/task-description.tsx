import { DottedSeprator } from "@/components/dotted-seprator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-tasks";
import type { Task } from "../types";

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({
      json: { description },
      param: { taskId: task.$id },
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center  justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeprator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            placeholder="Add a description..."
          />
          <Button
            onClick={handleSave}
            size="sm"
            variant="primary"
            className="w-fit ml-auto"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">no description set</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
