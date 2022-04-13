export interface AffiliateAttributes {
  _id?: string;
  name: string;
}

export enum Role {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER',
}

export interface Timezone {
  _id?: string;
  userId: string;
  name: string;
  city: string;
  offset: string;
}

export interface UserAttributes {
  _id?: string;
  email: string;
  password: string;
  role: Role;
}
