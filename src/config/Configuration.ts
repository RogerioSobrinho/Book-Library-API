import * as dotenv from 'dotenv';
dotenv.config();

// SYSTEM ENVIRONMENT

export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';

// API SERVICE

export const API_PORT: number = +process.env.API_PORT ?? 8080;

// DATABASE CONFIGURATION

export const DB_TYPE: string = process.env.DB_TYPE ?? '';
export const DB_HOST: string = process.env.DB_HOST ?? '';
export const DB_PORT: number = process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : 0;
export const DB_NAME: string = process.env.DB_NAME ?? '';
export const DB_USER: string = process.env.DB_USER ?? '';
export const DB_PASS: string = process.env.DB_PASS ?? '';
