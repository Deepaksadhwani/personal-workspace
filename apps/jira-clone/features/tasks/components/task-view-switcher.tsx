"use client";

import { DottedSeprator } from "@/components/dotted-seprator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBulkUpdateTask } from "@/features/tasks/api/use-bulk-update-tasks";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { columns } from "@/features/tasks/components/colunms";
import DataCalendar from "@/features/tasks/components/data-calendar";
import { DataFilters } from "@/features/tasks/components/data-filters";
import { DataKanban } from "@/features/tasks/components/data-kanban";
import { DataTable } from "@/features/tasks/components/data-table";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filter";
import type { TaskStatus } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import "@/features/tasks/components/data-calendar.css";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

export const TaskViewSwitcher = ({
  hideProjectFilter,
}: TaskViewSwitcherProps) => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const workspaceId = useWorkspaceId();
  const paramProjectId = useProjectId();
  const { mutate: bulkUpdate } = useBulkUpdateTask();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramProjectId || projectId,
    assigneeId,
    status,
    dueDate,
  });

  const { open } = useCreateTaskModal();

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({ json: { tasks } });
    },
    [bulkUpdate],
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg "
    >
      <div className="h-full flex flex-col overflow-auto p-4 ">
        <div className="flex flex-col  gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto ">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calender" className="h-8 w-full lg:w-auto">
              Calender
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size={"sm"} className="w-full lg:w-auto  ">
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeprator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeprator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center ">
            <Loader className="size-5  animate-spin text-muted-foreground " />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                onChange={onKanbanChange}
                tasks={tasks?.documents ?? []}
              />
            </TabsContent>
            <TabsContent value="calender" className="mt-0 h-full pb-4 ">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
