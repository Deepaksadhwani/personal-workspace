import { AnalyticsCard } from "@/components/analytics-card";
import { DottedSeprator } from "@/components/dotted-seprator";
import type { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg  w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center  flex-1">
          <AnalyticsCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
          <DottedSeprator direction="vertical" />
        </div>
        <div className="flex items-center  flex-1">
          <AnalyticsCard
            title="Assigned Tasks"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.assignedTaskDifference}
          />
          <DottedSeprator direction="vertical" />
        </div>
        <div className="flex items-center  flex-1">
          <AnalyticsCard
            title="Completed Tasks"
            value={data.completeTaskCount}
            variant={data.completeTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completeTaskDifference}
          />
          <DottedSeprator direction="vertical" />
        </div>
        <div className="flex items-center  flex-1">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDifference}
          />
          <DottedSeprator direction="vertical" />
        </div>
        <div className="flex items-center  flex-1">
          <AnalyticsCard
            title="Incomplete Tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTaskDifference}
          />
          <DottedSeprator direction="vertical" />
        </div>
      </div>
      <ScrollBar className="hidden" orientation="horizontal" />
    </ScrollArea>
  );
};

export default Analytics;
