import * as dotenv from 'dotenv';
dotenv.config();

// SYSTEM ENVIRONMENT

export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';
export const PROTOTYPE: string = process.env.PROTOTYPE ?? '';
export const DOMAIN: string = process.env.DOMAIN ?? '';
export const PROJECT_ID: string = process.env.PROJECT_ID ?? '';
export const PROJECT_NAME: string = process.env.PROJECT_NAME ?? '';

// API SERVICE

export const API_PORT: number = +process.env.API_PORT ?? 8080;
export const HOSTNAME: string = process.env.HOSTNAME ?? 'localhost';

// AUTHENTICATION SERVICE

export const JWT_SIGNATURE: string = process.env.JWT_SIGNATURE ?? '';
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? '';
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? '';

// DATABASE CONFIGURATION

export const DB_TYPE: string = process.env.DB_TYPE ?? '';
export const DB_HOST: string = process.env.DB_HOST ?? '';
export const DB_PORT: number = process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : 0;
export const DB_NAME: string = process.env.DB_NAME ?? '';
export const DB_USER: string = process.env.DB_USER ?? '';
export const DB_PASS: string = process.env.DB_PASS ?? '';
