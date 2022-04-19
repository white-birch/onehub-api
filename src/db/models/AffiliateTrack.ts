import { ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, Track } from '.';
import _Model from './_Model';

@Table({ tableName: 'Affiliate_Track' })
class AffiliateTrack extends _Model {
  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => Track)
  trackId!: string;
}

export default AffiliateTrack;
