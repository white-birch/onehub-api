import mongoose from 'mongoose';

import type { Affiliate } from 'types';

const schema = new mongoose.Schema<Affiliate>(
  {
    name: { type: String, required: true, minlength: 1 },
  },
  { timestamps: true }
);

export default mongoose.model<Affiliate>('Affiliate', schema);
