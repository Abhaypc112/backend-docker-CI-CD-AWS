export interface UserAttributes {
  id: string;
  name: string;
  username: string;
  photo_url?: string;
  is_active: boolean;

  created_by?: string;
  updated_by?: string;
  deleted_by?: string;

  created_on: Date;
  updated_on: Date;
  deleted_on?: Date | null;
}
