import { v4 as uuidv4 } from 'uuid';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCas.js';

export const findUserByDeviceID = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [
    deviceId,
  ]); // mysql2 모듈의 Prepared Statements 기능
  return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
  const id = uuidv4();
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id, deviceId]); // mysql2 모듈의 Prepared Statements 기능
  return { id, deviceId };
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};
