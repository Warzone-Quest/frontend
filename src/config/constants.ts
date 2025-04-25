import { ENV_CONFIG } from '@/config/envConfig';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${ENV_CONFIG.API_URL}/user/auth/login`,
    SIGNUP: `${ENV_CONFIG.API_URL}/user/auth/signup`,
    LOGOUT: `${ENV_CONFIG.API_URL}/user/auth/logout`,
    OTP_REGISTER: `${ENV_CONFIG.API_URL}/user/auth/otp/register`,
    OTP_VERIFY: `${ENV_CONFIG.API_URL}/user/auth/otp/verify`,
    OTP_RESEND: `${ENV_CONFIG.API_URL}/user/auth/otp/resend`,
  },
  USER: {
    PROFILE: `${ENV_CONFIG.API_URL}/user/service`,
  },
  TOURNAMENT: {
    CREATE: `${ENV_CONFIG.API_URL}/tournament/create`,
    JOIN: `${ENV_CONFIG.API_URL}/tournament/join`,
    LEAVE: `${ENV_CONFIG.API_URL}/tournament/leave`,
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    LOGIN: 'Login failed',
    SIGNUP: 'Signup failed',
    LOGOUT: 'Logout failed',
    OTP_REGISTER: 'OTP register failed',
    OTP_VERIFY: 'OTP verify failed',
    OTP_RESEND: 'OTP resend failed',
    DEFAULT: 'Something went wrong',
  },
  USER: {
    PROFILE: 'Profile fetch failed',
  },
  TOURNAMENT: {
    CREATE: 'Tournament create failed',
    JOIN: 'Tournament join failed',
    LEAVE: 'Tournament leave failed',
    DEFAULT: 'Something went wrong',
  },
} as const;

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
