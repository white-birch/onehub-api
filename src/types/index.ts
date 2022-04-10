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

export interface User {
  _id?: string;
  email: string;
  password: string;
  role: Role;
}
