import { Role } from 'types';

export interface UserAttributes {
  id?: string;
  email: string;
  password: string;
  roles: Role[];
}
