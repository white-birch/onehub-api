import { Plan } from '../../../db';
import * as validators from '../../../utils/validators';

import type { PlanAttributes } from '../../../db';

const createPlan = async ({ id, ...data }: PlanAttributes) => {
  await validators.validate([validators.name], data);
  return new Plan(data).save();
};

export default createPlan;
