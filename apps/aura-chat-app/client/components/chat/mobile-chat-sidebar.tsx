"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { GroupChatUserType } from "@/types/global";
import { MenuIcon } from "lucide-react";
import React from "react";

export default function MobileChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="bg-muted">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Users</SheetTitle>
        </SheetHeader>
        <div>
          {users.length > 0 &&
            users.map((item) => (
              <div key={item.id} className="bg-white rounded-md p-2 mt-2">
                <p className="font-bold"> {item.name}</p>
                <p>
                  Joined :{" "}
                  <span>{new Date(item.created_at).toDateString()}</span>
                </p>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
