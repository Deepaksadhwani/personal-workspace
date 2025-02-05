import env from "@/lib/env";

export const BASE_URL = env.BACKEND_URL;
export const API_ENDPOINT = `${BASE_URL}/api`;
export const LOGIN_ENDPOINT = `${API_ENDPOINT}/auth/login`;
