export interface TrackAttributes {
  id?: string;
  name: string;
  organizationId: string;
}

export interface TrackInput extends TrackAttributes {
  affiliateIds?: string[];
}
