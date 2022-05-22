import { Country, State } from 'types';

export interface AddressAttributes {
  streetAddress: string;
  additionalStreetAddress: string;
  city: string;
  state: State;
  zipCode: string;
  country: Country;
}
