"use client";

import ChatNav from "@/components/chat/chat-navbar";
import ChatSidebar from "@/components/chat/chat-sidebar";
import Chats from "@/components/chat/chats";
import type {
  ChatGroupType,
  GroupChatUserType,
  MessageType,
} from "@/types/global";
import { useEffect, useState } from "react";
import ChatUserDialog from "./chat-user-dialog";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType;
  users: GroupChatUserType[] | [];
  oldMessages: MessageType[] | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType | undefined>(
    undefined,
  );

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const parsedData = JSON.parse(data);
      setChatUser(parsedData);
    }
  }, [group.id]);

  return (
    <div className="flex ">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}

        <Chats group={group} chatUser={chatUser} oldMessages={oldMessages} />
      </div>
    </div>
  );
}
