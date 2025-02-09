import {
  type CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import CreateChat from "@/components/group-chat/create-chat";
import GroupChatCard from "@/components/group-chat/group-chat-card";
import { fetchChatGroups } from "@/fetch/group-fetch";
import type { ChatGroupType, CustomUser } from "@/types/global";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups = (await fetchChatGroups(
    session?.user?.token as string,
  )) as ChatGroupType[];

  return (
    <div>
      <DashboardNavbar
        name={session?.user?.name || ""}
        image={session?.user?.image || ""}
      />
      <div className="container flex flex-col px-3  md:px-20">
        <div className="flex justify-end mt-10">
          <CreateChat user={session?.user as CustomUser} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard
                group={item}
                key={item.passcode}
                user={session?.user as CustomUser}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
