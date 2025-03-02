import {
  CHAT_GROUP_ENDPOINT,
  CHAT_GROUP_USERS_ENDPOINT,
} from "@/lib/api-endpoint";

export async function fetchChatGroups(token: string) {
  const res = await fetch(CHAT_GROUP_ENDPOINT, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chat groups");
  }

  const response = await res.json();

  if (response?.data) {
    return response?.data;
  }

  return [];
}

export async function fetchChatGroup(id: string) {
  const res = await fetch(`${CHAT_GROUP_ENDPOINT}/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch chat groups");
  }

  const response = await res.json();

  if (response?.data) {
    return response?.data;
  }

  return null;
}

export async function fetchChatUsers(id: string) {
  const res = await fetch(`${CHAT_GROUP_USERS_ENDPOINT}/?group_id=${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response?.data) {
    return response?.data;
  }

  return [];
}
