export interface InviteAttributes {
  code: string;
  organizationId: string;
}

export interface InviteInput extends InviteAttributes {
  affiliateIds: string[];
}
