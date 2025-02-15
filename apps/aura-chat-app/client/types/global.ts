export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export type ChatGroupType = {
  id: string;
  user_id: number;
  title: string;
  passcode: string;
  created_at: string;
};

export type GroupChatUserType = {
  id: number;
  name: string;
  group_id: string;
  created_at: string;
};

export type MessageType = {
  id: string;
  group_id: string;
  message: string;
  created_at: string;
  name: string;
};
