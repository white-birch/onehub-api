import { ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, Track } from '.';
import _Association from './_Association';

@Table({ tableName: 'Affiliate_Track' })
class AffiliateTrack extends _Association {
  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => Track)
  trackId!: string;
}

export default AffiliateTrack;
