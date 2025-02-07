export interface LoginPayLoadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
}

export interface ChatGroup {
  user_id: number;
  title: string;
  passcode: string;
}
