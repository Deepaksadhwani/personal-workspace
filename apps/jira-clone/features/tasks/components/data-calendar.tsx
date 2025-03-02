import type { Task } from "@/features/tasks/types";
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "@/features/tasks/components/custom-toolbar";
import EventCard from "@/features/tasks/components/event-card";

interface DataCalendarProps {
  data: Task[];
}

const locales = {
  "en-US": enUS,
};

const locaizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(
    data.length > 0 && data[0]?.dueDate
      ? new Date(data[0].dueDate)
      : new Date(),
  );

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.$id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      localizer={locaizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, locaizer) =>
          locaizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
          />
        ),
        toolbar: () => {
          return <CustomToolbar date={value} onNavigate={handleNavigate} />;
        },
      }}
    />
  );
};

export default DataCalendar;
