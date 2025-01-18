import KanbanColumnHeader from "@/features/tasks/components/kanban-column-header";
import { type Task, TaskStatus } from "@/features/tasks/types";
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";
import { KanbanCard } from "./kanban-card";

interface DataKanbanProps {
  tasks: Task[];
  onChange: (
    tasks: { $id: string; status: TaskStatus; position: number }[],
  ) => void;
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

export const DataKanban = ({ tasks, onChange }: DataKanbanProps) => {
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

  useEffect(() => {
    const newTasks: TaskState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    for (const task of tasks) {
      newTasks[task.status].push(task);
    }

    for (const status of Object.keys(newTasks)) {
      newTasks[status as TaskStatus].sort((a, b) => {
        return a.position - b.position;
      });
    }

    setTaskState(newTasks);
  }, [tasks]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceStatus = source.droppableId as TaskStatus;
      const destinationStatus = destination.droppableId as TaskStatus;

      let updatesPayload: {
        $id: string;
        status: TaskStatus;
        position: number;
      }[] = [];

      setTaskState((prev) => {
        const newTasks = { ...prev };

        // safely remove the task from the source column
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);
        // there is no moved task ( should't happen, but just in case), return the previous state
        if (!movedTask) {
          console.error("No moved task found");
          return prev;
        }

        // create a new task object with potenitally updated status
        const updatedMovedTask =
          sourceStatus !== destinationStatus
            ? { ...movedTask, status: destinationStatus }
            : movedTask;

        // update the source column
        newTasks[sourceStatus] = sourceColumn;

        // add the task to the destination column
        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destinationStatus] = destinationColumn;

        // minimal payload to update the task
        updatesPayload = [];

        // always update the moved task
        updatesPayload.push({
          $id: updatedMovedTask.$id,
          status: destinationStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        // update positions for affected tasks in the destination column
        newTasks[destinationStatus].forEach((task, index) => {
          if (tasks && task.$id !== updatedMovedTask.$id) {
            const newPostion = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPostion) {
              updatesPayload.push({
                $id: task.$id,
                status: destinationStatus,
                position: newPostion,
              });
            }
          }
        });

        // if the task moved between columns, update positions in source column
        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPostion = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPostion) {
                updatesPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPostion,
                });
              }
            }
          });
        }
        return newTasks;
      });
      onChange(updatesPayload);
    },
    [onChange],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              <Droppable droppableId={board} key={board}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px] py-1.5 "
                  >
                    {taskState[board].map((task, index) => (
                      <Draggable
                        index={index}
                        draggableId={task.$id}
                        key={task.$id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
