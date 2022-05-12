export interface TrackAttributes {
  id?: string;
  name: string;
}

export interface TrackInput extends TrackAttributes {
  affiliateIds?: string[];
}
