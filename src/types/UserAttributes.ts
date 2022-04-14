export interface UserAttributes {
  _id?: string;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER',
}
