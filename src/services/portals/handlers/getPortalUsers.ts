import { uniqBy } from 'lodash';
import { User } from '../../../db';
import * as validators from '../validators';
import getPortal from './getPortal';

const getPortalUsers = async (portalId: string) => {
  validators.validate(validators.id, { id: portalId });

  const portal = await getPortal(portalId);

  const affiliates = await portal.$get('affiliates');

  const users = await affiliates.reduce(async (accPromise, affiliate) => {
    const [acc, users] = await Promise.all([accPromise, affiliate.$get('users')]);
    return [...acc, ...users];
  }, Promise.resolve([] as User[]));

  return uniqBy(users, 'id');
};

export default getPortalUsers;
