import * as validators from '../validators';
import { BadRequestError } from '../../../errors';
import { Affiliate, AffiliateAddress } from '../../../db';
import ErrorCode from '../../../utils/errorCodes';

import type { AffiliateAttributes } from '../../../db';

const createAffiliate = async ({ id, ...data }: AffiliateAttributes) => {
  validators.validate([validators.name, validators.portalId], data);

  try {
    const affiliate = new Affiliate(data, { include: [AffiliateAddress] });
    return await affiliate.save();
  } catch (error) {
    if ((error as Error)?.name === 'SequelizeForeignKeyConstraintError') {
      throw new BadRequestError([ErrorCode.PortalIdInvalid]);
    }

    throw error;
  }
};

export default createAffiliate;
