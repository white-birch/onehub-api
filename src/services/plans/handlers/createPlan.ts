import * as validators from '../validators';
import { Plan } from '../../../db';

import type { PlanAttributes } from '../../../db';

const createPlan = async ({ id, ...data }: PlanAttributes) => {
  await validators.validate([validators.affiliateId, validators.name], data);
  const plan = new Plan(data);
  return plan.save();
};

export default createPlan;
