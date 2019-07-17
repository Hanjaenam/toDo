import dotenv from 'dotenv';
import initPassport from './passport';

dotenv.config();

console.log('complete setting config');

export default {
  initPassport,
  PAGE: {
    LIMIT: 10,
  },
};
