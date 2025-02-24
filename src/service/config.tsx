import {Platform} from 'react-native';

const DEVELOPMENT_URL =
  Platform.OS === 'android'
    ? 'http://192.168.1.46:3000'
    : 'http://localhost:3000';

const PRODUCTION_URL = 'https://chefhavn.com';

// Determine the environment
const isDevelopment = __DEV__;

export const BASE_URL = isDevelopment ? DEVELOPMENT_URL : PRODUCTION_URL;

// Socket URL
export const SOCKET_URL = isDevelopment
  ? `${DEVELOPMENT_URL}`
  : `${PRODUCTION_URL}`;

export const GOOGLE_MAP_API = 'AIzaSyD0Svh7_EkCQypWAEn8aT6aWrYmwetPqgA';
