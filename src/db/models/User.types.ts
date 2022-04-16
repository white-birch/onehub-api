import { Role } from 'types';

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  roles: Role[];
}
