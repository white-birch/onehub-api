export interface UserAttributes {
  _id?: string;
  email: string;
  password: string;
  roles: Role[];
}

export enum Role {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Member = 'MEMBER',
}
