import { Role, User } from '../../types';
import * as validators from './validators';

describe('validators', () => {
  it('foo', () => {
    expect(
      validators.validate<User>(
        { ...validators._id, ...validators.email, ...validators.password, ...validators.role },
        { _id: '123', email: 'foobar', password: '123', role: Role.User }
      )
    ).toBe([]);
  });
});
