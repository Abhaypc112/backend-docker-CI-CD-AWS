import type { CookieOptions } from 'express';

export interface IResponse {
  statusCode?: number;
  message?: string;
  headers?: { [key: string]: string } | null;
  data?: any;
  cookies?: {
    name: string;
    value: string;
    options?: CookieOptions;
  }[];
  redirect?: string;
}