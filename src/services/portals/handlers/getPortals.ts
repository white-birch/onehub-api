import { Portal } from '../../../db';

const getPortals = async () => Portal.findAll();

export default getPortals;
