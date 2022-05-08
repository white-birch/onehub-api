import bcrypt from 'bcrypt';

if (!process.env.SALT_ROUNDS) {
  throw new Error('Missing environment variable: SALT_ROUNDS');
}

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const compare = (value: string, hash: string) => bcrypt.compare(value, hash);

export const hash = (value: string) => bcrypt.hash(value, SALT_ROUNDS);
