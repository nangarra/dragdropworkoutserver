require('dotenv').config();

const KB = 1024;
const MB = 1024 * KB;

const STAGING = 'staging'
const PRODUCTION = 'production'

//Development
let baseUrl = 'http://localhost:4500';
let clientUrl = 'http://localhost:3000';
let port = 4500;

if (process.env.NODE_ENV === PRODUCTION) {
  baseUrl = 'https://[].com';
  clientUrl = 'https://[].com';
  port = 5600;
} else if (process.env.NODE_ENV === STAGING) {
  baseUrl = 'https://[].com';
  clientUrl = 'https://[].com';
  port = 5600;
}

export const PORT = port;
export const BASE_URL = baseUrl;
export const CLIENT_URL = clientUrl;
export const SALT_ROUNDS = 10;

export const DEFAULT_PASSPORT_STRATEGY = 'jwt';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_TOKEN_EXPIRY_DEFAULT = 3600 * 8; //default 8 hours expiry value in seconds
export const JWT_TOKEN_EXPIRY_REMEMBER_ME = 3600 * 730; //default 1 month expiry value in seconds

export const TOKEN_EXPIRY_DEFAULT = 8; //default 8 hours expiry
export const TOKEN_EXPIRY_REMEMBER_ME = 1; //default 1 month expiry

export const UNIQUE_KEY_VIOLATION = '23505'; // Postgres error code for unique key violation

export const FORGOT_PASSWORD_TOKEN_EXPIRY_HOURS = 2; // Forgot password token expiry 2 hours

// File Upload
export const MAX_PHOTO_SIZE = 5 * MB;
export const MAX_FILE_SIZE = 25 * MB;

// Pagination
export const pagination = {
  ALL: 'all',
  DEFAULT_LIMIT: 20,
};

// Roles
export const DEFAULT_ROLES = {
  SUPER_ADMIN: 1,
  COMPANY_ADMIN: 2,
  USER: 3,
}

// Social Media Types
export const SOCIAL_MEDIA_TYPES = {
  FACEBOOK: 1,
  INSTAGRAM: 2,
  TWITTER: 3,
  LINKEDIN: 4,
  PINTEREST: 5,
  GOOGLEPLUS: 6,
};

export const ALL = 'all';
export const ANY = 'any';