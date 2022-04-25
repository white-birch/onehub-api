import * as validators from '../validators';
import { Plan } from '../../../db';

import type { PlanAttributes } from '../../../db';

const createMembership = async ({ id, ...data }: PlanAttributes) => {
  await validators.validate([validators.planId, validators.userId], data);
  const plan = new Plan(data);
  return plan.save();
};

export default createMembership;
