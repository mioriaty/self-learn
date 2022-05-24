export interface SessionState {
  id?: string;
  aud: string;
  username: string;
  email: string;
  role: string;
  last_sign_in_at: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  user_metadata: Record<any, any>;
  app_metadata: Record<any, any>;
  created_at: string;
  updated_at: string;
  identities: [];
}
export interface UserState {
  id: string;
  updated_at: string;
  username: string;
  avatar_url: string;
  email: string;
  phone: string;
  about: string;
}

export interface UserProfile {
  username: string;
  phone: string;
  about: string;
}
