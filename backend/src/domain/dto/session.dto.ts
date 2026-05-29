export interface sessions{
      id: string;
  user_id: string;
  refresh_token: string;
  expires_at: Date;
  created_at?: Date;
}