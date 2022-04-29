import { InviteType } from 'types';

export interface InviteAttributes {
  code: string;
  type: InviteType;
  id: string;
}
