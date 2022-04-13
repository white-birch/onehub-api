import { User } from '../../../db';

const getUsers = async () => User.findAll();

export default getUsers;
