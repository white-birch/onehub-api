import Cryptr from 'cryptr';
import { sign, verify } from './jwt';

import type { User } from 'db';
import type { JwtPayload } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

if (!TOKEN_SECRET) {
  throw new Error('Missing environment variable: TOKEN_SECRET');
}

const cryptr = new Cryptr(TOKEN_SECRET);

export const signToken = async (user: User, organizationId?: string) =>
  cryptr.encrypt(
    await sign({
      userId: user.id,
      isOrganizationAdmin: organizationId ? await user.isOrganizationAdmin(organizationId) : false,
    })
  );

export const verifyToken = async (token: string) => verify(cryptr.decrypt(token)) as JwtPayload;
