import { Role } from 'types';

export interface UserAttributes {
  _id?: string;
  email: string;
  password: string;
  roles: Role[];
}
