import { InviteType } from 'types';

export interface InviteAttributes {
  id?: string;
  code: string;
  invitableType: InviteType;
  invitableId: string;
}
