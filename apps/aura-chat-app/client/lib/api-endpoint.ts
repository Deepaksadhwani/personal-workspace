import env from "@/lib/env";

export const BASE_URL = env.BACKEND_URL;
export const API_ENDPOINT = `${BASE_URL}/api`;
export const LOGIN_ENDPOINT = `${API_ENDPOINT}/auth/login`;
export const CHAT_GROUP_ENDPOINT = `${API_ENDPOINT}/chat-group`;
export const CHAT_GROUP_USERS_ENDPOINT = `${API_ENDPOINT}/chat-group-users`;
export const CHATS_ENDPOINT = `${API_ENDPOINT}/chats`;
