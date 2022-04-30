import type { JwtPayload } from 'jsonwebtoken';
import type { User } from '../db';

export enum Country {
  US = 'US',
}

export enum AffiliateRole {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Member = 'MEMBER',
}

export enum InviteType {
  Organization = 'ORGANIZATION',
  Affiliate = 'AFFILIATE',
}

export enum OrganizationRole {
  Admin = 'ADMIN',
}

export enum State {
  AK = 'AK',
  AL = 'AL',
  AR = 'AR',
  AZ = 'AZ',
  CA = 'CA',
  CO = 'CO',
  CT = 'CT',
  DC = 'DC',
  DE = 'DE',
  FL = 'FL',
  GA = 'GA',
  HI = 'HI',
  IA = 'IA',
  ID = 'ID',
  IL = 'IL',
  IN = 'IN',
  KS = 'KS',
  KY = 'KY',
  LA = 'LA',
  MA = 'MA',
  MD = 'MD',
  ME = 'ME',
  MI = 'MI',
  MN = 'MN',
  MO = 'MO',
  MS = 'MS',
  MT = 'MT',
  NC = 'NC',
  ND = 'ND',
  NE = 'NE',
  NH = 'NH',
  NJ = 'NJ',
  NM = 'NM',
  NV = 'NV',
  NY = 'NY',
  OH = 'OH',
  OK = 'OK',
  OR = 'OR',
  PA = 'PA',
  RI = 'RI',
  SC = 'SC',
  SD = 'SD',
  TN = 'TN',
  TX = 'TX',
  UT = 'UT',
  VA = 'VA',
  VT = 'VT',
  WA = 'WA',
  WI = 'WI',
  WV = 'WV',
  WY = 'WY',
}

export interface TokenContext {
  value: string;
  payload: JwtPayload;
  user: User;
}
