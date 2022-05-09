import { Plan } from '../../../db';
import * as validators from '../../../utils/validators';

import type { PlanAttributes } from '../../../db';

const createPlan = async ({ id, ...data }: PlanAttributes) => {
  await validators.validate([validators.affiliateId, validators.name], data);
  const plan = new Plan(data);
  return plan.save();
};

export default createPlan;
