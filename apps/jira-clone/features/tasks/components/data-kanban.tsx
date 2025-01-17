import KanbanColumnHeader from "@/features/tasks/components/kanban-column-header";
import { type Task, TaskStatus } from "@/features/tasks/types";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";

interface DataKanbanProps {
  tasks: Task[];
}

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TaskState = {
  [key in TaskStatus]: Task[];
};

export const DataKanban = ({ tasks }: DataKanbanProps) => {
  const [taskState, setTaskState] = useState<TaskState>(() => {
    const initialState: TaskState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    for (const task of tasks) {
      initialState[task.status].push(task);
    }

    for (const status of Object.keys(initialState)) {
      initialState[status as TaskStatus].sort((a, b) => {
        return a.position - b.position;
      });
    }
    return initialState;
  });
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto ">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted p-1.5  rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={taskState[board].length}
              />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
