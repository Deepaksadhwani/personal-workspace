import ChatBase from "@/components/chat/chat-base";
import { fetchChats } from "@/fetch/chats-fetch";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/group-fetch";
import type {
  ChatGroupType,
  GroupChatUserType,
  MessageType,
} from "@/types/global";
import { notFound } from "next/navigation";

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id.length !== 36) return notFound();
  const group: ChatGroupType | null = await fetchChatGroup(id);

  if (!group) return notFound();

  const users: Array<GroupChatUserType> = await fetchChatUsers(id);
  const chats: MessageType[] = await fetchChats(id);

  return (
    <div>
      <ChatBase group={group} users={users} oldMessages={chats} />
    </div>
  );
}
