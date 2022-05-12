export interface InviteAttributes {
  id?: string;
  code: string;
  organizationId: string;
}

export interface InviteInput extends InviteAttributes {
  affiliateIds?: string[];
}
